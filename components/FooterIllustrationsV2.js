// ** React Imports
import { Fragment } from 'react'

// ** MUI Components
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// Styled Components
const MaskImg = styled('img')(({ theme }) => ({
  // zIndex: -1,
  bottom: '7%',
  width: '100%',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    bottom: '17.5%'
  }
}))

const FooterIllustrationsV2 = (props) => {
  // ** Props
  const { image } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const src = image || `/auth-v2-login-mask-dark.png`

  if (!hidden) {
    return (
      <Fragment>
        <MaskImg alt='mask' src={src} />
      </Fragment>
    )
  } else {
    return null
  }
}

export default FooterIllustrationsV2
