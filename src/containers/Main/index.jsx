import React, {memo, useCallback, useEffect, useState} from 'react' //memo cria um componente mutável e evita renderização desnecessária na página
import Api from '../../api'
import Board from './Components/Board'
import Panel from './Components/Panel'
import {ContainerStyled} from './style'

function Main(){
    const[data, setData] = useState({}) //seta os valores
    const[country, setCountry] = useState('brazil')
    const updateAt = new Date().toLocaleString()

    //cria memorização dos valores e evita o React de entrar em loop
    const getCovidData = useCallback((country) => {
        Api.getCountry(country)
            .then(data => setData(data))
    }, [])

    //inicializa quando a página for renderizada
    useEffect(() => {
        getCovidData(country)
    }, [getCovidData, country])

    const handleChange = ({target}) => {
        const country = target.value
        setCountry(country)
    }

    return (
        <ContainerStyled>
            <div className="mb-2">
                <Panel
                    data={data}
                    updateAt={updateAt}
                    onChange={handleChange}
                    country={country}
                    getCovidData={getCovidData}
                />
            </div>
            <Board data={data} />
            
        </ContainerStyled>
    )
}

export default memo(Main)