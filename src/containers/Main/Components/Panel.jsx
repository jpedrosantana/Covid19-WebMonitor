import React, {memo} from 'react'
import RefreshIcon from '../../../assets/images/refresh.svg'
import {Card, Typography, Button, Select, MenuItem} from '../../../components'
import { CardPanelContentStyled, ItemStyled } from './style'
import COUNTRIES from '../../../commons/constants/countries'

const navigatorHasShare = navigator.share

function Panel({updateAt, onChange, data, country, getCoviddata}){
    const {cases, recovered, deaths, todayCases, todayDeaths} = data

    const renderCountries = (country, index) => (
        <MenuItem key={`Country-${index}`} value={country.value}>
            <ItemStyled>
                <div>{country.label}</div>
                <img src={country.flag} alt={`País-${country.label}`} />
            </ItemStyled>
        </MenuItem>
    )

    const textCovid19 = `País: ${country}`

    const copyInfo = () => {
        navigator.clipboard.writeText(textCovid19) //api do browser (veja mais no site da mozzilla)
    }

    const shareInfo = () => {
        navigator.share({
            title: `Dados do Covid19 - ${country} - recuperados: ${recovered}`,
            text: textCovid19,
            url: 'https://covid19dio.netlify.app/'
        })
    }

    const renderShareButton = (
        <div>
            <Button variant="contained" color="primary" onClick={shareInfo}>
                Compartilhar
            </Button>
        </div>
    )

    const renderCopyButton = (
        <div>
            <Button variant="container" color="primary" onClick={copyInfo}>
                Copiar
            </Button>
        </div>
    )

    return(
        <Card>
            <CardPanelContentStyled>
                <div>
                    <Typography variant="h5" component="span" color="primary">COVID19 - Painel Coronavírus</Typography><br />
                    <Typography variant="body2" component="span" color="primary">Atualizado em: {updateAt}</Typography>
                    <div className="pt-2">
                        <Select onChange={onChange} value={country}>
                            {COUNTRIES.map(renderCountries)}
                        </Select>
                    </div>
                </div>
                {navigatorHasShare ? renderShareButton : renderCopyButton}
            </CardPanelContentStyled>
        </Card>
    )
}

export default memo(Panel)