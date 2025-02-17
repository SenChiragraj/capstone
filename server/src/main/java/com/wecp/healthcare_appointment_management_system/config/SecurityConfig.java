package com.wecp.healthcare_appointment_management_system.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.wecp.healthcare_appointment_management_system.jwt.JwtRequestFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsService userDetailsService;
    private final JwtRequestFilter jwtRequestFilter;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfig(UserDetailsService userDetailsService,
                          JwtRequestFilter jwtRequestFilter,
                          PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/doctors/register", "/api/patient/register", "/api/receptionist/register", "/api/user/login", "/api/patient/doctors" ).permitAll()
                .antMatchers(HttpMethod.GET, "/api/patient/appointments").hasAnyAuthority("PATIENT", "RECEPTIONIST")
                .antMatchers(HttpMethod.GET, "/api/patient/medicalrecords").hasAnyAuthority("PATIENT", "RECEPTIONIST", "DOCTOR")
                .antMatchers(HttpMethod.POST, "/api/patient/appointment", "/api/patient/medicalrecord").hasAnyAuthority("PATIENT", "RECEPTIONIST")
                .antMatchers(HttpMethod.PUT, "/api/patient/medicalrecord").hasAnyAuthority("PATIENT", "RECEPTIONIST")
                .antMatchers(HttpMethod.DELETE, "/api/patient/medicalrecord").hasAnyAuthority("PATIENT", "RECEPTIONIST")
                .antMatchers(HttpMethod.POST, "/api/doctor/appointments").hasAnyAuthority("RECEPTIONIST", "DOCTOR")
                .antMatchers(HttpMethod.GET, "/api/doctor/appointments").hasAnyAuthority("DOCTOR", "RECEPTIONIST")
                .antMatchers(HttpMethod.GET, "/receptionist/**", "/api/receptionist/**").hasAnyAuthority("RECEPTIONIST")
                .antMatchers("/api/user/**", "/api/all/**", "/health", "/api/receptionist/appointments", "/api/receptionist/appointment/**", "/api/patient/doctors", "/api/patient/medicalrecords", "/api/patient/medicalrecord").hasAnyAuthority("PATIENT", "RECEPTIONIST", "DOCTOR")
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
