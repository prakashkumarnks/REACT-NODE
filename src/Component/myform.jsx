import React from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { httpverbsInsertForm } from './Common';

class MyForm extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            RfId: "",
            a: "",
            b: "",
            selectedFile : null,
            sess: "",
            postId: "",
            butonname: "Submit",
            redirect: false,
            vardisabled: false
        };
    }


    componentDidMount() {

        if ( this.props.match.params.postId ) {
            axios.post( 'http://localhost:8083/editupdate', { RfId: this.props.match.params.postId } )
                .then( response => {
                    ///	console.log(this.props.match.params.secpar);
                    console.log( response.data.data[0].a);

                    this.setState( { RfId: response.data.data[0].a, a: response.data.data[0].b, b: response.data.data[0].c } );
                    this.setState( { butonname: 'Update' } );
                    this.setState( { vardisabled: true } );
                } )
                .catch( error => {
                    console.log( error );
                } );
        }
    }

    validateForm() {
        return this.state.a.length > 0 && this.state.b.length > 0;
    }

    handleChange = event => {
        this.setState( {
            [event.target.id]: event.target.value
        } );
    }

    checkimage=event=>{
   /// checkimage(e) {
        //console.log(e.target.files[0])
     //   this.setState({ selectedFile : e.target.files[0] });
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
          })
    }
    

    //	handleSubmit () {
    handleSubmit = event => {
        event.preventDefault();
        var elements = document.getElementsByClassName( "req" );
        for ( var i = 0; i < elements.length; i++ ) {
            var item = elements.item( i );
            //  var ctrlName        = item.name;    
            var id = item.id;
            var type = item.type;

            if ( ( type === "text" || type === "textarea" ) ) {

                let value = item.value.trim();
                //  alert(value);

                if ( value === "" ) {
                    item.focus();
                    alert( "please Fill " + id );
                    return false;
                }

            }
            else if ( type === "select-one" || type === "file" ) {
                let value = item.value.trim();
                if ( value === "" ) {
                    var itemrequiredtext = item.getAttribute( 'data-required' );
                    item.focus();
                    alert( "please select " + itemrequiredtext );
                    return false;
                }
            }


        }
        this.post();
    }

    post = a => {

        var bodyFormData = new FormData();
        bodyFormData.set( 'RfId', this.state.RfId );
        bodyFormData.set( 'b', this.state.b );
        bodyFormData.set( 'a', this.state.a );
        bodyFormData.set( 'filesss', this.state.selectedFile );
        
        
        httpverbsInsertForm( '/myform', bodyFormData ).then( response => {
            if ( response.data.ErrorMessage ) {
                alert( response.data.ErrorMessage );
                document.getElementById( response.data.id ).focus();
                return false;
            }
            if ( response.data.success = "success" ) {
                alert( response.data.message );
                this.setState( { redirect: true } );
            }
        } )
    }


    render() {


        const { butonname, vardisabled } = this.state;


        if ( this.state.redirect ) {
            return <Redirect to='/view' />;
        }

        return (
            <div className="container">

            
                <div className="col-sm-4">
                    <form onSubmit={this.handleSubmit} method="POST">

                        <FormGroup controlId="RfId" >
                            <FormControl
                                autoFocus
                                type="hidden" disabled
                                value={this.state.RfId}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup controlId="a" >
                            <label>a</label>
                            <FormControl
                                ///autoFocus
                                type="text"
                                value={this.state.a}
                                onChange={this.handleChange}
                                ///name="a"
                                className="req"
                                ref={( input ) => { this.a = input; }}
                            />
                        </FormGroup>
                        <FormGroup controlId="b">
                            <label>b</label>
                            <FormControl
                                value={this.state.b}
                                onChange={this.handleChange}
                                type="text"
                                disabled={vardisabled}
                                className="req"
                            />
                        </FormGroup>


                        <FormGroup controlId="filesss">
                            <label>b</label>
                            <FormControl
                                value={this.state.filesss}
                                type="file"
                                className="req"
                                data-required="Image Upload"
                                onChange={ this.checkimage }
                            />
                        </FormGroup>


                        <Button
                            block 
                            type="submit"
                        >
                            {butonname}
                        </Button>
                    </form>

                </div>
            </div>
        );
    }
}
export default MyForm;