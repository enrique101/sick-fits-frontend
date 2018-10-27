import React, { Component } from "react";
import { Query } from "react-apollo";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

class AccountInfo extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error erorr={error} />;
          return (
            <dl>
              <dt>Name:</dt>
              <dd>{data.me.name}</dd>
              <dt>Email:</dt>
              <dd>{data.me.email}</dd>
            </dl>
          );
        }}
      </Query>
    );
  }
}
export default AccountInfo;
