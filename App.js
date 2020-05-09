import React, { Component } from 'react';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      title : 'ToDo App',
      act: 0,
      index: '',
      startDate: new Date(),
      datas: []
    }
  }

  componentDidMount()
  {
    this.refs.summary.focus();
    this.refs.description.focus();
    this.refs.priority.focus();
  }

  fSubmit = (event) =>
  {
      event.preventDefault();
      console.log('try');

      let datas = this.state.datas;
      let summary = this.refs.summary.value;
      let description = this.refs.description.value;
      let priority = this.refs.priority.value;

      if(this.state.act === 0 )
      {
          let data = 
          {
            summary, description, priority
          }
        datas.push(data);
      }
      else
      {            //Update case
        let index = this.state.index;
        datas[index].summary = summary;
        datas[index].description = description;
        datas[index].priority = priority;
      }

      this.setState({
        datas : datas,
        act : 0
      });

      this.refs.myForm.reset();
      this.refs.summary.focus();
  }

  handleChange = (event) => 
    {
        this.setState({
          startDate: event
        })
    }

    fRemove = (i) =>
    {
      let datas = this.state.datas;
      datas.splice(i,1);
      this.setState({
        datas : datas
      });
      this.refs.myForm.reset();
      this.refs.summary.focus();
    }

    fEdit = (i) =>
    {
        let data = this.state.datas[i];
        this.refs.summary.value = data.summary;
        this.refs.description.value = data.description;
        this.refs.priority.value = data.priority;

        this.setState = ({
          act: 1,
          index :i
        })

        this.refs.summary.focus();
    }

  render()
  {
    return(
      <div className="App">
          <h2>{this.state.title}</h2>

          
          <form ref="myForm" className="myForm">
              <label><strong>Summary</strong></label><br/>
                <input type="text" ref="summary" placeholder="summary" maxLength="140" minLength="10" className="form-Field"/>
              <br/><br/>

              <div className="input-field">
                <label><strong>Description</strong></label><br/>
                <textarea ref="description" placeholder="description" className="textArea" maxLength="500" minLength="10"/>
              </div>
              <br/>

              <div className="inline">
                  <label><strong>Due Date</strong></label>&nbsp;
                  <DatePicker onChange={this.handleChange}  className="border"/>

                  <label className="margin"><strong>Priority </strong></label> &nbsp;&nbsp;
                  <select className="border" ref="priority" >
                      <option value="None">None</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                  </select>
              </div>
              <br/>
              <div>
                  <button onClick={(event)=>this.fSubmit(event)} className="myButton">Add</button>
              </div>
          </form>
         

          <pre>
                
                {this.state.datas.map((data, i) =>
                  <table id="customers">
                    
                    <tr>
                      <td><strong>Summary</strong> </td>
                      <td><strong>Description</strong></td>
                      <td><strong>Priority</strong></td>
                      <td><strong>Actions</strong></td>
                    </tr>
                  
                    <tr>
                        <td key={i} className="myList">
                            {data.summary}
                        </td>
                        <td key={i}>
                           {data.description}
                        </td>
                        <td key={i}>
                           {data.priority}
                        </td>
                        <td key={i}>
                            <button onClick={()=>this.fRemove(i)} className="myButton">Delete</button>&nbsp;&nbsp;
                            <button onClick={()=>this.fEdit(i)} className="myButton">Edit</button>
                        </td>
                      </tr>

                  </table>
                )}
               
          </pre>
      </div>
    )
  }
}

export default App;
