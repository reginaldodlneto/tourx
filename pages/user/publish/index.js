import { Formik } from 'formik'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'

import TemplateDefault from '../../../src/templates/Default'
import FileUpload from '../../../src/components/FileUpload'
import { initialValues, validationSchema } from './formValues'

import useStyles from './styles'

const Publish = () => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log('ok, enviou o form', values)
        }}
      >
        {({
          touched,
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                >
                  Publicar Anúncio
                </Typography>
                <Typography
                  component="h5"
                  variant="h5"
                  align="center"
                  color="textPrimary"
                >
                  Quanto mais detalhado, melhor!
                </Typography>
              </Container>

              <br />
              <br />

              {/* TITLE AND CATEGORY */}

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FormControl error={errors.title && touched.title} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      Título do anúncio
                    </InputLabel>
                    <Input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.title && touched.title ? errors.title : null}
                    </FormHelperText>
                  </FormControl>
                  <br />
                  <br />

                  <FormControl
                    error={errors.category && touched.category}
                    fullWidth
                  >
                    <InputLabel className={classes.inputLabel}>
                      Título do anúncio
                    </InputLabel>
                    <Select
                      name="category"
                      value={values.category}
                      fullWidth
                      onChange={handleChange}
                    >
                      <MenuItem value="Bebê e Criança">Bebê e Criança</MenuItem>
                      <MenuItem value="Agricultura">Agricultura</MenuItem>
                      <MenuItem value="Moda">Moda</MenuItem>
                      <MenuItem value="Carros, motos e caminhões">
                        Carros, motos e caminhões
                      </MenuItem>
                      <MenuItem value="Serviços">Serviços</MenuItem>
                      <MenuItem value="Lazer">Lazer</MenuItem>
                      <MenuItem value="Animais">Animais</MenuItem>
                      <MenuItem value="Moveis, casa e jardim">
                        Moveis, casa e jardim
                      </MenuItem>
                      <MenuItem value="Imóveis">Imóveis</MenuItem>
                      <MenuItem value="Equipamento e Ferramentas">
                        Equipamento e Ferramentas
                      </MenuItem>
                      <MenuItem value="Celulares e tablets">
                        Celulares e tablets
                      </MenuItem>
                      <MenuItem value="Esporte">Esporte</MenuItem>
                      <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                      <MenuItem value="Emprego">Emprego</MenuItem>
                      <MenuItem value="Outros">Outros</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.category && touched.category
                        ? errors.category
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              {/* IMAGE */}

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FileUpload
                    files={values.files}
                    errors={errors.files}
                    touched={touched.files}
                    setFieldValue={setFieldValue}
                  />
                </Box>
              </Container>

              {/* DESCRIPTION */}

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FormControl
                    error={errors.description && touched.description}
                    fullWidth
                  >
                    <InputLabel className={classes.inputLabel}>
                      Escreva com detalhe o produto que está vendendo.
                    </InputLabel>
                    <Input
                      name="description"
                      multiline
                      rows={6}
                      variant="outlined"
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.description && touched.description
                        ? errors.description
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              {/* PRICE */}

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FormControl error={errors.price && touched.price} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      Preço de venda
                    </InputLabel>
                    <Input
                      name="price"
                      variante="outlined"
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">R$</InputAdornment>
                      }
                    />
                    <FormHelperText>
                      {errors.price && touched.price ? errors.price : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              {/* NAME, EMAIL AND PHONE */}

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Dados de contato
                  </Typography>
                  <FormControl error={errors.name && touched.name} fullWidth>
                    <InputLabel className={classes.inputLabel}>Nome</InputLabel>
                    <Input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.name && touched.name ? errors.name : null}
                    </FormHelperText>
                  </FormControl>
                  <br />
                  <br />

                  <FormControl error={errors.email && touched.email} fullWidth>
                    <InputLabel classemail={classes.inputLabel}>
                      E-mail
                    </InputLabel>
                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.email && touched.email ? errors.email : null}
                    </FormHelperText>
                  </FormControl>
                  <br />
                  <br />

                  <FormControl error={errors.phone && touched.phone} fullWidth>
                    <InputLabel classphone={classes.inputLabel}>
                      Telefone
                    </InputLabel>
                    <Input
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.phone && touched.phone ? errors.phone : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>
              <Container maxWidth="md" className={classes.boxContainer}>
                <Box textAlign="right">
                  <Button type="submit" variant="contained" color="secondary">
                    Publicar Anúncio
                  </Button>
                </Box>
              </Container>
            </form>
          )
        }}
      </Formik>
    </TemplateDefault>
  )
}

export default Publish
