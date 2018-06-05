package com.ncr.project.horizon.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.ncr.project.horizon.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.ncr.project.horizon.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.ncr.project.horizon.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.ncr.project.horizon.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.ncr.project.horizon.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.ncr.project.horizon.domain.BIComponent.class.getName(), jcacheConfiguration);
            cm.createCache(com.ncr.project.horizon.domain.BIComponent.class.getName() + ".organizations", jcacheConfiguration);
            cm.createCache(com.ncr.project.horizon.domain.Organization.class.getName(), jcacheConfiguration);
            cm.createCache(com.ncr.project.horizon.domain.Organization.class.getName() + ".bIComponents", jcacheConfiguration);
            cm.createCache(com.ncr.project.horizon.domain.Organization.class.getName() + ".users", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
