/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'

const USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
    }
  }
`

const MERCHANTS = gql`
  query GetMerchants {
    merchants {
      id
      name
    }
  }
`

const ADD_TRANSACTION = gql`
  mutation CreateTransaction($amount: Float, $credit: Boolean, $description: String, $debit: Boolean, $merchantId: ID, $userId: ID) {
    createTransaction(credit: $credit, amount: $amount, debit: $debit, description: $description, merchantId: $merchantId, userId: $userId) {
      id
    }
  }
`

function TransactionMutationButton (props) {
  const [addTransactionMutation] = useMutation(ADD_TRANSACTION)
  return (
    <React.Fragment>
      <button className='button is-primary is-pulled-right' onClick={() => addTransactionMutation({ variables: { amount: props.amountInput, credit: props.creditInput, description: props.descriptionInput, debit: !props.creditInput, merchantId: props.merchantInput, userId: props.userInput } })}>Create Transaction</button>
    </React.Fragment>
  )
}

TransactionMutationButton.propTypes = {
  amountInput: PropTypes.number,
  creditInput: PropTypes.bool,
  descriptionInput: PropTypes.string,
  merchantInput: PropTypes.string,
  userInput: PropTypes.string
}

function UserQuery () {
  const { loading, error, data } = useQuery(USERS)

  if (loading) return <option> Loading </option>
  if (error) { return <option> Loading </option> }

  return (
    <React.Fragment>
      <option disabled selected >Select User </option>
      {data.users.map(user => (
        <option key={user.id} value={user.id} >
          {user.firstName} {user.lastName}
        </option>
      ))}
    </React.Fragment>
  )
}

function MerchantQuery () {
  const { loading, error, data } = useQuery(MERCHANTS)

  if (loading) return <option> Loading </option>
  if (error) return <option> error </option>
  return (
    <React.Fragment>
      <option disabled selected> Select Merchant </option>
      {data.merchants.map(merchant => (
        <option key={merchant.id} value={merchant.id} >
          {merchant.name}
        </option>
      ))}
    </React.Fragment>
  )
}

// useing select lists for merchants and users isn't scalable but because this app is small and the data isnt changing
// it works for our general purpose of generating transactions

// I would have some sort of UI that showed that a user forget an input but to keep it simple, I'm assuming the user will
// allways have all the input fields correctly filled

class TransactionModal extends React.Component {
  constructor (props) {
    super(props)
    this.userChange = this.userChange.bind(this)
    this.merchantChange = this.merchantChange.bind(this)
    this.amountChange = this.amountChange.bind(this)
    this.descriptionChange = this.descriptionChange.bind(this)
    this.creditChange = this.creditChange.bind(this)
    this.state = { userInput: '',
      merchantInput: '',
      amountInput: 0.0,
      creditInput: true,
      descriptionInput: '' }
  }

  userChange (event) {
    this.setState({ userInput: event.target.value })
  }

  merchantChange (event) {
    this.setState({ merchantInput: event.target.value })
  }

  amountChange (event) {
    this.setState({ amountInput: parseFloat(event.target.value) })
  }

  descriptionChange (event) {
    this.setState({ descriptionInput: event.target.value })
  }

  creditChange () {
    this.setState({ creditInput: !this.state.creditInput })
  }

  render () {
    let modalClassName = 'modal '

    if (this.props.modalActive) {
      modalClassName += 'is-active'
    }

    return (
      <div className={modalClassName} >
        <div className='modal-background' />
        <div className='modal-content'>
          <div className='box'>
            <div className='columns'>
              <div className='column'>
                <div className='select is-primary' >
                  <select onChange={this.userChange}>
                    <UserQuery userChange={this.userChange} />
                  </select>
                </div>
              </div>
              <div className='column'>
                <input className='input is-info' onChange={this.amountChange} placeholder='amount' type='text' />
              </div>
              <div className='column'>
                <div className='select is-primary is-pulled-right' >
                  <select onChange={this.merchantChange} >
                    <MerchantQuery merchantChange={this.merchantChange} />
                  </select>
                </div>
              </div>
            </div>
            <input className='input is-info ' onChange={this.descriptionChange} placeholder='description' style={{ marginBottom: '20px' }} type='text' />
            <div className='columns'>
              <div className='column has-text-centered'>
                <label className='radio'>
                  <input checked={!this.state.creditInput} name='Debit' onChange={this.creditChange} type='radio' /> Debit
                </label>
                <label className='radio'>
                  <input checked={this.state.creditInput} name='Credit' onChange={this.creditChange} type='radio' /> Credit
                </label>
              </div>
              <div className='column'>
                <TransactionMutationButton amountInput={this.state.amountInput}
                  creditInput={this.state.creditInput}
                  descriptionInput={this.state.descriptionInput}
                  merchantInput={this.state.merchantInput}
                  userInput={this.state.userInput} />
              </div>
            </div>
          </div>
        </div>
        <button aria-label='close' className='modal-close is-large' onClick={this.props.closeModal} style={{ backgroundColor: 'red' }} />
      </div>

    )
  }
}

TransactionModal.propTypes = {
  closeModal: PropTypes.func,
  modalActive: PropTypes.bool
}

export default TransactionModal
