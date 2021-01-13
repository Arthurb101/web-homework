import React from 'react'
import AppRouter from './routes'
import TransactionModal from './components/TransactionModal'
import { BaseNavbar } from './components/BaseNavbar'

class DivvyApp extends React.Component {
  constructor (props) {
    super(props)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = { modalActive: false }
  }

  // Because the app is fairly small and the only way to update the data I am pulling is through a terminal connected to the database
  // this is why I am mounting getting the data here if this app was larger I would want to retrive the data in different components
  // and make it more flexible to updates in the data

  showModal () {
    this.setState({ modalActive: true })
  }

  closeModal () {
    this.setState({ modalActive: false })
  }

  render () {
    return (
      <React.Fragment>
        <TransactionModal closeModal={this.closeModal} modalActive={this.state.modalActive} />
        <BaseNavbar modalActive={this.state.modalActive} showModal={this.showModal} />
        <AppRouter />
      </React.Fragment>
    )
  }
}

export default DivvyApp
