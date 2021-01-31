import React,{ Component } from 'react';
import MaterialTable from 'material-table';
import {Button,Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

const columns=[
    {title:"Name",field:"name"},
] 

class Favorites extends Component{

    constructor(props){
        super(props)
        this.state={
            show:false,
        }
    }

    render(){
      
        return(
            <div className="container">
         <MaterialTable title="My Pokemons"
                  columns={columns}
                  data={this.props.favorites}
                  actions={[
                    {
                      icon: 'add',
                      tooltip: 'Open Details',
                      onClick: (event, rowData) => {
                        this.handleModalOpenDetails(rowData.name,rowData.url)
                      }
                    },
                  ]}
                  options={{
                    actionsColumnIndex: -1,
                  }}
                />
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return state
  };

export default connect(mapStateToProps)(Favorites)