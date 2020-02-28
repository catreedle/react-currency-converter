import React from "react";

class Saved extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                Tes
                {this.props.location.state.savedConversions.map(savedConversion => {
                    return(
                        <p>{savedConversion}</p>
                    )
                })}
            </div>
        )
    }

    
}

export default Saved