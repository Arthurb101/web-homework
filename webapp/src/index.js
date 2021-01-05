import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import DivvyApp from './DivvyApp'
import { client } from './network/apollo-client'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <DivvyApp />
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
