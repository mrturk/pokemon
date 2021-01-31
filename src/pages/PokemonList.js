import React,{ Component } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import {Button,Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { insertPokemons } from '../actions/pokemons-action';
import { updateMyPocemons } from '../actions/my-pocemons-actions';

const columns=[
    {title:"Name",field:"name"},
]


class PokemonList extends Component{
    
    constructor(props){
        super(props)
        this.state={
            posts:[],
            show:false,
            img_url:[],
            ability_entry:[],
            ability_description:"",
            pokemon_name:[],
            my_pokemons:[],
            ability_url:[],
        }
        this.onUpdateMyPocemons = this.onUpdateMyPocemons.bind(this);
        this.onInsertPokemons = this.onInsertPokemons.bind(this);
        this.handleModalOpenDetails = this.handleModalOpenDetails.bind(this)
    }

    
	onUpdateMyPocemons(){
        var min = 1;
        var max = 5;
        var rand =  min + (Math.random() * (max-min));

        this.setState({show:false})
		axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=50%22").then(response=>{
            if(rand>2){
                for(var i =0; i<response.data.results.length; i++){
                    if(response.data.results[i].name===this.state.pokemon_name){
                        for(var j =0; j< this.state.my_pokemons.length; j++){
                            if(this.state.my_pokemons[j].name===this.state.pokemon_name){
                                alert("You already have this Pokemon")
                                return
                            }
                        }
                        this.setState({
                            my_pokemons:this.props.mypokemons
                        })
                        this.state.my_pokemons.push(response.data.results[i])
                        this.props.UpdateMyPocemons(this.state.my_pokemons)
                    }
                }
            }
            else{
                alert("Pokemon not caught")
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    
    onInsertPokemons(){
        axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=50%22").then(response=>{
            this.props.InsertPokemons(response.data.results)
            console.log(this.props)
            this.setState({
                posts:response.data.results
            })
        }).catch(error=>{
            console.log(error)
        })
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
    handleModalClose(){
        this.setState({show:false})
    }
    componentDidMount(){
        this.onInsertPokemons()
        if(this.state.my_pokemons.length==0){
            this.setState({
                my_pokemons:this.props.mypokemons
            })
        }
    }
    render(){

        console.log(this.state.my_pokemons)
        return(
            <div className="container">
                <MaterialTable title="Pokemons"
                

                data={this.props.pokemons}
                columns={columns}
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
                      <Button  onClick={this.onUpdateMyPocemons}>Catch The Pokemon</Button>
                  </Modal.Footer>

            </Modal>
                      
        

            </div>

        )
    }
}



const mapStateToProps = (state,props) => {
    return state
  };

const mapDispatchToProps = {
    UpdateMyPocemons:updateMyPocemons,
    InsertPokemons:insertPokemons
  };


export default connect(mapStateToProps,mapDispatchToProps)(PokemonList)


