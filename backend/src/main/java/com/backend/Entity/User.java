package com.backend.Entity;

import com.backend.Entity.type.AuthProviderType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user" , indexes = {
        @Index(name = "idx_provider_id_provider_type" , columnList = "providerId, providerType")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @JoinColumn(unique = true , nullable = false)
    private String username;

    private String providerId;

    @Enumerated(EnumType.STRING)
    private AuthProviderType providerType;
}
