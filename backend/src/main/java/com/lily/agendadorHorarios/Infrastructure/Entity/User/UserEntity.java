    package com.lily.agendadorHorarios.Infrastructure.Entity.User;
    
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import org.springframework.security.core.GrantedAuthority;
    import org.springframework.security.core.authority.SimpleGrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;
    
    import java.util.Collection;
    import java.util.List;
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Entity
    @Table(name = "users")
    public class UserEntity implements UserDetails {
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private String id;

        private String name;
        private String email;
        private String password;
    
        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private UserRole role = UserRole.ROLE_USER;
    
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return List.of(new SimpleGrantedAuthority(this.role.name()));
        }
    
        @Override
        public String getPassword() {
            return this.password;
        }
    
        @Override
        public String getUsername() {
            return this.email;
        }
    
        @Override
        public boolean isAccountNonExpired() { return true; }
    
        @Override
        public boolean isAccountNonLocked() { return true; }
    
        @Override
        public boolean isCredentialsNonExpired() { return true; }
    
        @Override
        public boolean isEnabled() { return true; }
    }