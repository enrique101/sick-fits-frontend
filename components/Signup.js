import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import {CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!,
        $password: String!,
        $name: String!
    ){
        signup(
            email:$email, 
            name: $name, 
            password: $password    
        ){
            id
            email
            name
        }
    }
`;

class Signup extends Component {
    state = {
        email: '',
        name: '',
        password: '',
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return (
            <Mutation mutation={SIGNUP_MUTATION}
                      variables={this.state}
                      refetchQueries={[
                        { query: CURRENT_USER_QUERY }
                    ]}>
                {(signup, { error, loading }) => (
                    <Form
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      await signup();
                      this.setState({ name: '', email: '', password: '' });
                    }}
                  >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Signup for an account</h2>
                            <Error error={error}/>
                            <label htmlFor="email">
                                Email
        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                            </label>
                            <label htmlFor="name">
                                name
        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                            </label>
                            <label htmlFor="password">
                                Password
        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                            </label>
                            <button type="submit">Sign Up!</button>
                        </fieldset>
                    </Form>
                    )
                }
            </Mutation>
        );
    }
}
export default Signup;
export { SIGNUP_MUTATION };