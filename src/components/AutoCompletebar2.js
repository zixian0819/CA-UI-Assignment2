import React, { useState } from 'react'

function Autocompletebar2() {

    const users = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
    const [suggestions, setSuggestions] = useState([])
    const [text, setText] = useState('')

    const onChangeHandler = (text) => {
        let matches = []
        if (text.length > 0 && users !== null && users !== undefined) {
        matches = users.filter(user => {
        const regex = new RegExp(`${text}`, "gi");
        return user.match(regex)
        })
        }
        setText(text)
        setSuggestions(matches)
        }
        console.log(suggestions)

    const onSuggestHandler = (text) => {
        setText(text)
        setSuggestions([])
    }

    return (
        <div className="input-1">
            <input 
              className="input"
              type="text"
              onChange={e => onChangeHandler(e.target.value)}
              value={text}
              placeholder="Search"
            />
            {suggestions && suggestions.map((suggestion, i) =>
            <div className="suggestion" onClick={() => onSuggestHandler(suggestion)}>{suggestion}</div>
            )}   
        </div> 
    )
}

export default Autocompletebar2