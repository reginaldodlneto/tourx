import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'

import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import { DeleteForever } from '@material-ui/icons'

import TemplateDefault from '../../src/templates/Default'

const useStyles = makeStyles(theme => ({
  mask: {}, // Quando está assim, sabe que está sendo usando como filho
  mainImage: {},
  boxContainer: {
    paddingBottom: theme.spacing(3)
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3)
  },
  thumbsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 15
  },
  inputLabel: {
    fontWeight: 400,
    color: theme.palette.primary.main
  },
  dropZone: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    width: 200,
    height: 150,
    margin: '0 15px 15px 0',
    backgroundColor: theme.palette.background.default,
    border: '2px dashed black'
  },
  thumb: {
    position: 'relative',
    width: 200,
    height: 150,
    backgroundSize: 'cover',
    margin: '0 15px 15px 0',
    backgroundPosition: 'center center',

    '& $mainImage': {
      backgroundColor: '#292929',
      padding: '6px 10px',
      position: 'absolute',
      bottom: 0,
      left: 0
    },

    '&:hover $mask': {
      display: 'flex'
    },

    '& $mask': {
      //mask é filho de thumb (faz igual no sass)
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      height: '100%',
      width: '100%'
    }
  }
}))

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(6, 'Escreva um título maior.')
    .max(100, 'Título muito grande')
    .required('Campo obrigatório'),

  category: yup.string().required('Campo obrigatório'),

  description: yup
    .string()
    .min(50, 'Escreva uma descrição com pelo manos 50 caracteres.')
    .required('Campo obrigatório'),

  price: yup.number().required('Campo obrigatório'),

  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('Campo obrigatório'),

  name: yup.string().required('Campo obrigatório'),

  phone: yup.number().required('Campo obrigatório'),

  files: yup
    .array()
    .min(1, 'Envie pelo menos uma foto')
    .required('Campo obrigatório')
})

const Publish = () => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Formik
        initialValues={{
          title: '',
          category: '',
          description: '',
          price: '',
          email: '',
          name: '',
          phone: '',
          files: []
        }}
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
          const { getRootProps, getInputProps } = useDropzone({
            accept: 'image/*',
            onDrop: acceptedFile => {
              const newFiles = acceptedFile.map(file => {
                return Object.assign(file, {
                  preview: URL.createObjectURL(file)
                })
              })

              setFieldValue('files', [...values.files, ...newFiles])
            }
          })

          const handleRemoveFile = fileName => {
            const newFileState = values.files.filter(
              file => file.name !== fileName
            )
            setFieldValue('files', newFileState)
          }
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
                  <Typography
                    component="h6"
                    variant="h6"
                    color={
                      errors.files && touched.files ? 'error' : 'textPrimary'
                    }
                  >
                    Imagens
                  </Typography>
                  <Typography
                    component="div"
                    variant="body2"
                    color={
                      errors.files && touched.files ? 'error' : 'textPrimary'
                    }
                  >
                    A primeira imagem é a foto principal do seu anúncio.
                  </Typography>
                  {errors.files && touched.files ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.files}
                    </Typography>
                  ) : null}
                  <Box className={classes.thumbsContainer}>
                    <Box className={classes.dropZone} {...getRootProps()}>
                      <input name="files" {...getInputProps()} />
                      <Typography
                        variant="body2"
                        color={
                          errors.files && touched.files
                            ? 'error'
                            : 'textPrimary'
                        }
                      >
                        Clique para adicionar ou arraste a imagem para aqui.
                      </Typography>
                    </Box>

                    {values.files.map((file, index) => (
                      <Box
                        key={file.name}
                        className={classes.thumb}
                        style={{
                          backgroundImage: `url(${file.preview})`
                        }}
                      >
                        {index === 0 ? (
                          <Box className={classes.mainImage}>
                            <Typography variant="body" color="secondary">
                              Principal
                            </Typography>
                          </Box>
                        ) : null}

                        <Box className={classes.mask}>
                          <IconButton
                            color="secondary"
                            onClick={() => handleRemoveFile(file.name)}
                          >
                            <DeleteForever fontSize="large" />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </Box>
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
