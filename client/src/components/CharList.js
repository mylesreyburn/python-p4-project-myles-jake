import React from "react"
import Card from './Card'

function CharList({characters}){
    console.log({characters})
    const charList = characters.map((character, index) => {
        return <Card key={index} character={character}/>
    })

    return (
        {charList}
    )
}

export default CharList