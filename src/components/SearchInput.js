import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

// import { Input, Ul, Li, SuggestContainer } from './style';

export default function SearchInput({
    loading,
    options,
    requests,
    placeholder,
}) {
    const [inputValue, setInputValue] = useState('');
    
    const debouncedSave = useCallback (
        debounce((newValue) => requests(newValue), 1000),
        []
    );
    const onSuggestHandler = (newValue) => {
        setInputValue(newValue)
  
    }

    const updateValue = (newValue) => {
        setInputValue(newValue);
        requests (newValue);
    };
      
    return (
        <div>
            <input className = "input"
            value={inputValue}
                onChange={(input) => updateValue(input.target.value)}
                placeholder={placeholder} />
                
            < div className="input-1">
                <div className="ul">
                    {loading && <div className="li ">Loading... </div>}
                    {options?.length > 0 &&
                        !loading &&
                        options?.map((value, index) => (
                            <div className="li" key={`${value.name}-${index} `}  onClick={() => onSuggestHandler(value.name)}>{value.name}</div>
                        ))}
                </div>
            </div>
        </div>
    );
}