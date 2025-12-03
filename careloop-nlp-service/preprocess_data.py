import json
import re
from sentence_transformers import SentenceTransformer
import os

print("Loading model...")
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
print("Model loaded successfully!")


def clean_ts_to_json(content):
    """
    Cleans TS content and converts it to valid JSON.
    """
    # Remove export statements
    content = re.sub(r"export\s+const\s+\w+\s*=\s*", "", content)
    
    # Remove TS comments
    content = re.sub(r"//.*", "", content)
    content = re.sub(r"/\*[\s\S]*?\*/", "", content)
    
    # Extract array only
    match = re.search(r"\[[\s\S]*\]", content)
    if not match:
        raise ValueError("No array found in the file")
    
    array_str = match.group(0)
    
    # Convert single quotes → double quotes
    array_str = array_str.replace("'", '"')
    
    # **FIX: Remove ALL trailing commas before ] or }**
    array_str = re.sub(r",(\s*[\]}])", r"\1", array_str)
    
    # **FIX: Handle multiple trailing commas**
    array_str = re.sub(r",+(\s*[\]}])", r"\1", array_str)
    
    return array_str


def parse_ts_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        raw = f.read()

    try:
        cleaned = clean_ts_to_json(raw)
        data = json.loads(cleaned)
        return data

    except Exception as e:
        print("\n❌ ERROR parsing", file_path)
        print("Reason:", e)
        print("--- CLEANED CONTENT PREVIEW ---")
        print(cleaned[:400])
        print("--- END PREVIEW ---")
        return []


def process_all_topics():
    all_data = []
    question_id = 1

    topic_files = sorted(
        [
            os.path.join("training_data", f)
            for f in os.listdir("training_data")
            if f.endswith(".ts")
        ]
    )

    for file_path in topic_files:
        print(f"\n📄 Processing {file_path}...")
        items = parse_ts_file(file_path)
        print(f"   → Found {len(items)} questions")

        for qa in items:
            question = qa.get("question", "").strip()
            if not question:
                continue

            embedding = model.encode(question).tolist()

            out = {
                "id": question_id,
                "topic": qa.get("topic", "General"),
                "question": question,
                "variations": qa.get("variations", []),
                "answer": qa.get("answer", ""),
                "keywords": qa.get("keywords", []),
                "embedding": embedding,
            }

            all_data.append(out)
            question_id += 1

    return all_data


def save_output(data, output="qa_data_with_embeddings.json"):
    with open(output, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\n💾 Saved {len(data)} entries → {output}")


if __name__ == "__main__":
    print("\n🚀 Starting preprocessing...\n")

    data = process_all_topics()
    save_output(data)

    print("\n✅ Done! Now reload your API and check total_questions.\n")
