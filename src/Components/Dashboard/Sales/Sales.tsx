import React, { Component } from 'react'

interface props {
    data: string
}
export class Sales extends Component<props> {
    render() {
        return (
            <div>
                <h1>{this.props.data}</h1>
            </div>
        )
    }
}

export default Sales
