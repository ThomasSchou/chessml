import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export default class Setup extends React.Component<{}, {gameid: number, gameType: number}> {
  constructor(props: any) {
    super(props);
    this.state = {gameid: 0, gameType: 0};
  }
  componentDidMount() {
    if(this.state.gameid === 0 || this.state.gameid === null) {
      this.setID(Math.floor(Math.random() * (1000000 - 1 + 1) + 1))
    }
  }
  setIDEvent = (event: any) => {
    console.log(event.target.value)
    this.setState({gameid: event.target.value})
    console.log(this.state)
  }
  setID = (number: any) => {
    console.log(number)
    this.setState({gameid: number})
    console.log(this.state)
  }
  setType = (event: any) => {
    console.log(event.target.value)
    this.setState({gameType: event.target.value})
  }
  render() {
    return (
    <div className='container'>
      
      <h3 className='text-center text-white'>Setup Game</h3>
      <div className='setup-grid'>
        <div>
          <div>
            <h5 className='text-left text-white' style={{marginLeft: '20px'}}>Game Type</h5>
            
          </div>
          <select onChange={(e) => this.setType(e)} className="form-select" style={{marginLeft: '20px'}} aria-label="Default select example">
            <option value="0">Player Vs. Player</option>
            <option value="1">Player Vs. AI</option>
            <option value="2">AI vs. AI</option>
          </select>
        </div>
        <div>
          <div>
            <h5 className='text-left text-white' style={{marginLeft: '20px'}}>Game ID</h5>
          </div>
          <input onChange={(e) => this.setIDEvent(e)} type="text" className="form-control" placeholder="ID (Optional)" aria-label="Server"></input>
        </div>
        <div>
          <div>
            <h5 className='text-left text-white' style={{marginLeft: '20px'}}>AI Type</h5>
          </div>
          <select onChange={(e) => this.setType(e)} className="form-select" style={{marginLeft: '20px'}} aria-label="Default select example">
            <option value="0">Latest</option>
            
          </select>
        </div>
        <div>
          <div>
            <h5 className='text-left text-white' style={{marginLeft: '20px'}}>AI Iterations</h5>
          </div>
          <input onChange={(e) => this.setIDEvent(e)} type="text" className="form-control" value='100' placeholder="Iterations" aria-label="Server"></input>
        </div>
        
      </div>
      <NavLink to={`/Chess/${this.state.gameid}/${this.state.gameType}`}><button type="button" className="btn">Start Game</button></NavLink>
    </div>
    )
  }
}
