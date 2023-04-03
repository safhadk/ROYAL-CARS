import React, { useState } from 'react';

function Search() {
    const [inputValue, setInputValue] = useState('');

    console.log(inputValue)

    const k = (e) => {
        setInputValue(e.target.value[1])
        console.log(inputValue)
        console.log('k called')
        console.log(e.target.value)
    }

    return (
        <div className='mt-3'>
            <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Search City..." onChange={k}/>
            <datalist id="datalistOptions">
                <option value="Kochi" />
                <option value="Kozhikode" />
                <option value="Chennai" />
                <option value="Bengaluru" />
                <option value="Trivandrum" />
            </datalist>
        </div>
    );
}

export default Search;
