package com.ncr.project.horizon.web.rest;

import com.ncr.project.horizon.HorizonappApp;

import com.ncr.project.horizon.domain.BIComponent;
import com.ncr.project.horizon.repository.BIComponentRepository;
import com.ncr.project.horizon.service.BIComponentService;
import com.ncr.project.horizon.service.dto.BIComponentDTO;
import com.ncr.project.horizon.service.mapper.BIComponentMapper;
import com.ncr.project.horizon.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ncr.project.horizon.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BIComponentResource REST controller.
 *
 * @see BIComponentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HorizonappApp.class)
public class BIComponentResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_KEY = "AAAAAAAAAA";
    private static final String UPDATED_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_AUTH = "AAAAAAAAAA";
    private static final String UPDATED_AUTH = "BBBBBBBBBB";

    @Autowired
    private BIComponentRepository bIComponentRepository;

    @Autowired
    private BIComponentMapper bIComponentMapper;

    @Autowired
    private BIComponentService bIComponentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBIComponentMockMvc;

    private BIComponent bIComponent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BIComponentResource bIComponentResource = new BIComponentResource(bIComponentService);
        this.restBIComponentMockMvc = MockMvcBuilders.standaloneSetup(bIComponentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BIComponent createEntity(EntityManager em) {
        BIComponent bIComponent = new BIComponent()
            .name(DEFAULT_NAME)
            .key(DEFAULT_KEY)
            .auth(DEFAULT_AUTH);
        return bIComponent;
    }

    @Before
    public void initTest() {
        bIComponent = createEntity(em);
    }

    @Test
    @Transactional
    public void createBIComponent() throws Exception {
        int databaseSizeBeforeCreate = bIComponentRepository.findAll().size();

        // Create the BIComponent
        BIComponentDTO bIComponentDTO = bIComponentMapper.toDto(bIComponent);
        restBIComponentMockMvc.perform(post("/api/bi-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bIComponentDTO)))
            .andExpect(status().isCreated());

        // Validate the BIComponent in the database
        List<BIComponent> bIComponentList = bIComponentRepository.findAll();
        assertThat(bIComponentList).hasSize(databaseSizeBeforeCreate + 1);
        BIComponent testBIComponent = bIComponentList.get(bIComponentList.size() - 1);
        assertThat(testBIComponent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBIComponent.getKey()).isEqualTo(DEFAULT_KEY);
        assertThat(testBIComponent.getAuth()).isEqualTo(DEFAULT_AUTH);
    }

    @Test
    @Transactional
    public void createBIComponentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bIComponentRepository.findAll().size();

        // Create the BIComponent with an existing ID
        bIComponent.setId(1L);
        BIComponentDTO bIComponentDTO = bIComponentMapper.toDto(bIComponent);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBIComponentMockMvc.perform(post("/api/bi-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bIComponentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BIComponent in the database
        List<BIComponent> bIComponentList = bIComponentRepository.findAll();
        assertThat(bIComponentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = bIComponentRepository.findAll().size();
        // set the field null
        bIComponent.setName(null);

        // Create the BIComponent, which fails.
        BIComponentDTO bIComponentDTO = bIComponentMapper.toDto(bIComponent);

        restBIComponentMockMvc.perform(post("/api/bi-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bIComponentDTO)))
            .andExpect(status().isBadRequest());

        List<BIComponent> bIComponentList = bIComponentRepository.findAll();
        assertThat(bIComponentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkKeyIsRequired() throws Exception {
        int databaseSizeBeforeTest = bIComponentRepository.findAll().size();
        // set the field null
        bIComponent.setKey(null);

        // Create the BIComponent, which fails.
        BIComponentDTO bIComponentDTO = bIComponentMapper.toDto(bIComponent);

        restBIComponentMockMvc.perform(post("/api/bi-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bIComponentDTO)))
            .andExpect(status().isBadRequest());

        List<BIComponent> bIComponentList = bIComponentRepository.findAll();
        assertThat(bIComponentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBIComponents() throws Exception {
        // Initialize the database
        bIComponentRepository.saveAndFlush(bIComponent);

        // Get all the bIComponentList
        restBIComponentMockMvc.perform(get("/api/bi-components?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bIComponent.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].key").value(hasItem(DEFAULT_KEY.toString())))
            .andExpect(jsonPath("$.[*].auth").value(hasItem(DEFAULT_AUTH.toString())));
    }

    @Test
    @Transactional
    public void getBIComponent() throws Exception {
        // Initialize the database
        bIComponentRepository.saveAndFlush(bIComponent);

        // Get the bIComponent
        restBIComponentMockMvc.perform(get("/api/bi-components/{id}", bIComponent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bIComponent.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.key").value(DEFAULT_KEY.toString()))
            .andExpect(jsonPath("$.auth").value(DEFAULT_AUTH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBIComponent() throws Exception {
        // Get the bIComponent
        restBIComponentMockMvc.perform(get("/api/bi-components/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBIComponent() throws Exception {
        // Initialize the database
        bIComponentRepository.saveAndFlush(bIComponent);
        int databaseSizeBeforeUpdate = bIComponentRepository.findAll().size();

        // Update the bIComponent
        BIComponent updatedBIComponent = bIComponentRepository.findOne(bIComponent.getId());
        // Disconnect from session so that the updates on updatedBIComponent are not directly saved in db
        em.detach(updatedBIComponent);
        updatedBIComponent
            .name(UPDATED_NAME)
            .key(UPDATED_KEY)
            .auth(UPDATED_AUTH);
        BIComponentDTO bIComponentDTO = bIComponentMapper.toDto(updatedBIComponent);

        restBIComponentMockMvc.perform(put("/api/bi-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bIComponentDTO)))
            .andExpect(status().isOk());

        // Validate the BIComponent in the database
        List<BIComponent> bIComponentList = bIComponentRepository.findAll();
        assertThat(bIComponentList).hasSize(databaseSizeBeforeUpdate);
        BIComponent testBIComponent = bIComponentList.get(bIComponentList.size() - 1);
        assertThat(testBIComponent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBIComponent.getKey()).isEqualTo(UPDATED_KEY);
        assertThat(testBIComponent.getAuth()).isEqualTo(UPDATED_AUTH);
    }

    @Test
    @Transactional
    public void updateNonExistingBIComponent() throws Exception {
        int databaseSizeBeforeUpdate = bIComponentRepository.findAll().size();

        // Create the BIComponent
        BIComponentDTO bIComponentDTO = bIComponentMapper.toDto(bIComponent);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBIComponentMockMvc.perform(put("/api/bi-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bIComponentDTO)))
            .andExpect(status().isCreated());

        // Validate the BIComponent in the database
        List<BIComponent> bIComponentList = bIComponentRepository.findAll();
        assertThat(bIComponentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBIComponent() throws Exception {
        // Initialize the database
        bIComponentRepository.saveAndFlush(bIComponent);
        int databaseSizeBeforeDelete = bIComponentRepository.findAll().size();

        // Get the bIComponent
        restBIComponentMockMvc.perform(delete("/api/bi-components/{id}", bIComponent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BIComponent> bIComponentList = bIComponentRepository.findAll();
        assertThat(bIComponentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BIComponent.class);
        BIComponent bIComponent1 = new BIComponent();
        bIComponent1.setId(1L);
        BIComponent bIComponent2 = new BIComponent();
        bIComponent2.setId(bIComponent1.getId());
        assertThat(bIComponent1).isEqualTo(bIComponent2);
        bIComponent2.setId(2L);
        assertThat(bIComponent1).isNotEqualTo(bIComponent2);
        bIComponent1.setId(null);
        assertThat(bIComponent1).isNotEqualTo(bIComponent2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BIComponentDTO.class);
        BIComponentDTO bIComponentDTO1 = new BIComponentDTO();
        bIComponentDTO1.setId(1L);
        BIComponentDTO bIComponentDTO2 = new BIComponentDTO();
        assertThat(bIComponentDTO1).isNotEqualTo(bIComponentDTO2);
        bIComponentDTO2.setId(bIComponentDTO1.getId());
        assertThat(bIComponentDTO1).isEqualTo(bIComponentDTO2);
        bIComponentDTO2.setId(2L);
        assertThat(bIComponentDTO1).isNotEqualTo(bIComponentDTO2);
        bIComponentDTO1.setId(null);
        assertThat(bIComponentDTO1).isNotEqualTo(bIComponentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bIComponentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bIComponentMapper.fromId(null)).isNull();
    }
}
