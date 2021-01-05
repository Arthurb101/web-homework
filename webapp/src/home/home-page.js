/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import axios from 'axios'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'

const TRANSACTIONS = gql`
  query GetCompanies {
    transactions{
    id
    amount
    merchant{
      name
    }
    user{
      firstName
      lastName
      company{
        name
      }
    }
    merchant{
        name
    }
    description
    debit
    credit
  }
  }
`

function TransactionsQuery (props) {
  const { loading, error, data } = useQuery(TRANSACTIONS)

  if (loading) return <tr><td> Loading </td></tr>
  if (error) { return <tr><td> Error </td></tr> }

  function convertIntoCurrency (amount) {
    // in this I technically round down
    // currency Conversion is very complicated and if this was on a live site I would communicate with people on how the company
    // handles currency Conversion but this is just a test app, so keeping it simple
    return ((amount / 100) * props.currencyConversionRate).toFixed(2)
  }
  // I would talk to a Project Manager on how to implement the credit and debit functionallity but because it is possible to
  // have both credit or debit set to false or true that is why I am  making it possible to show both or none.
  return (
    <React.Fragment>
      {data.transactions.map(transaction => (
        <tr key={transaction.id} >
          <td>{transaction.user.firstName} {transaction.user.lastName}</td>
          <td>{transaction.merchant.name}</td>
          <td>{convertIntoCurrency(transaction.amount)}</td>
          <td>{(transaction.credit) ? 'Credit ' : ''}{(transaction.debit) ? 'Debit' : ''}</td>
          <td>{transaction.user.company.name}</td>
          <td>{transaction.description}</td>
        </tr>
      ))}
    </React.Fragment>
  )
}

TransactionsQuery.propTypes = {
  currencyConversionRate: PropTypes.number
}

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.currencyChange = this.currencyChange.bind(this)
    this.state = {
      currencyConversionRate: 1.0
    }
  }

  currencyChange (event) {
    var currency = event.target.value
    var apiBase = 'https://api.exchangeratesapi.io/latest?base=USD&symbols='
    var api = apiBase.concat(currency)
    axios(api)
      .then(
        (result) => {
          this.setState({ currencyConversionRate: result.data.rates[currency] })
        }
      )
  }

  render () {
    return (
      <div className='container' style={{ textAlign: 'center' }}>
        <h1> Transactions </h1>
        <div className='select is-primary mystyle' >
          <select onChange={this.currencyChange} >
            <option value='USD' >USD</option>
            <option value='CAD' >CAD</option>
            <option value='GBP' >GBP</option>
            <option value='JPY' >JPY</option>
            <option value='EUR' >EUR</option>
            <option value='CNY' >CNY</option>
          </select>
        </div>

        <table className='table is-fullwidth is-striped'>
          <thead>
            <tr>
              <th>User</th>
              <th>Merchant</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Comapny</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <TransactionsQuery currencyConversionRate={this.state.currencyConversionRate} />
          </tbody>
        </table>
      </div>
    )
  }
}

export default Home
