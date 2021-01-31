import React,{ Component } from 'react';
import MaterialTable from 'material-table';
import {Button,Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateFavorites } from '../actions/favorites'
import axios from 'axios'

const columns=[
    {title:"Name",field:"name"},
] 

class MyPokemons extends Component{

    constructor(props){
        super(props)
        this.state={
            control:false,
            show:false,
            img_url:[],
            pokemon_name:[],
            ability_url:[],
            ability_entry:[],
            ability_description:"",
            favorites:[],
        }
        this.onUpdateMyFavorites = this.onUpdateMyFavorites.bind(this);
    }
    handleModalClose(){
        this.setState({show:false})
    }
    onUpdateMyFavorites(){

        this.setState({show:false})
        for(var i = 0; i<this.props.mypokemons.length; i++){
            if(this.props.mypokemons[i].name===this.state.pokemon_name){
                
                for(var j =0; j< this.state.favorites.length; j++){
                    if(this.state.favorites[j].name===this.state.pokemon_name){
                        alert("This Pokemon has already been added to favorites")
                        return
                    }
                }
                this.state.favorites.push(this.props.mypokemons[i])
                this.props.UpdateMyFavorites(this.state.favorites)
                alert("Pokemon have been added to favorites")


            }
        }

    }

    handleModalOpenDetails(name,url){
        this.state.ability_url=[]
        this.setState({
            show:true,
        })
        axios.get(url).then(res=>{
            for(var i =0; i<res.data.abilities.length; i++){
                this.state.ability_entry.push(res.data.abilities[i].ability)
                this.state.ability_url.push(res.data.abilities[i].ability.url)
            }
            for(var i =0; i<this.state.ability_url.length; i++){
                axios.get(this.state.ability_url[i]).then(res=>{

                    for(var j=0; j<res.data.effect_entries.length; j++){
                        if(res.data.effect_entries[j].language.name=="en"){
                            this.setState({
                                ability_description:res.data.effect_entries[j].effect
                            })
                        }
                        else{
                            continue;
                        }
                    }
                })
            }
            
            this.setState({
                img_url:res.data.sprites.other.dream_world.front_default,
                pokemon_name:res.data.name
            })
        }).catch(err=>{

        })
    }
    componentDidMount(){
        if(this.state.favorites.length==0){
            this.setState({
                favorites:this.props.favorites
            })
        }
    }
    render(){

        return(
            <div className="container">
                  <MaterialTable title="My Pokemons"
                  columns={columns}
                  data={this.props.mypokemons}
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
                    actionsColumnIndex: -1
                  }}
                />

        <Modal show={this.state.show}>
                  <Modal.Header>
                      <h1>{this.state.pokemon_name}</h1>
                  </Modal.Header>
                  <Modal.Body>
                  <img src={this.state.img_url} alt="" />
                  {this.state.ability_description}
                  </Modal.Body>
                  <Modal.Footer>
                      <Button onClick={()=>{this.handleModalClose()}}>
                          Close
                      </Button>
                      <Button  onClick={this.onUpdateMyFavorites}>Add to favorites</Button>
                  </Modal.Footer>
            </Modal>
            </div>

            
        )
    }

}

const mapStateToProps = (state) => {
    return state
  };
  const mapDispatchToProps = {
    UpdateMyFavorites:updateFavorites,
  }
export default connect(mapStateToProps,mapDispatchToProps)(MyPokemons)