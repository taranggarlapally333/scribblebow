import React from 'react' ; 
import * as QuoteComps from './QuoteComps' ; 
import Header from '../../components/NavHeader' ;
class WriteQuote extends React.Component
{
    constructor(props)
    {
        super(props) ; 
        this.state = { id:""}
    }

    render()
    {
        return (<div>
            <Header title= "Quote" />
            <QuoteComps.default />
        </div>)
    }
}

export default WriteQuote ; 