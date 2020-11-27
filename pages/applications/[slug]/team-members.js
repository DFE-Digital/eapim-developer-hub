import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Content from '../../../content.json'
import { Loading } from 'components/Loading'

const page = 'Team members'

class TeamMembers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newTeamMember: {
        email: '',
        role: 'Select role'
      },
      addingNewTeamMember: false,
      redirectUrlToChange: '',
      updateTeamMemberValue: ''
    }
  }

  addNewTeamMember = () => {
    this.setState({ addingNewTeamMember: true })
  }

  changeNewTeamMember = (e) => {
    this.setState({
      newTeamMember: {
        email: e.target.value,
        role: this.state.newTeamMember.role
      }
    })
  }

  selectRole = (e) => {
    this.setState({
      newTeamMember: {
        email: this.state.newTeamMember.email,
        role: e.target.value
      }
    })
  }

  cancelNewTeamMember = (e) => {
    e.preventDefault()
    this.setState({
      addingNewTeamMember: false,
      newTeamMember: {
        email: '',
        role: 'Select role'
      }
    })
  }

  saveNewTeamMember = (e) => {
    e.preventDefault()
    console.log(this.state.newTeamMember)
  }

  render () {
    const {
      selectedApplication,
      user: { data }
    } = this.props

    if (!selectedApplication) return <Loading />

    return (
      <Fragment>
        <div className='govuk-width-container'>
          <div className='govuk-breadcrumbs'>
            <ol className='govuk-breadcrumbs__list'>
              <li className='govuk-breadcrumbs__list-item'>
                <a className='govuk-breadcrumbs__link' href={Content['Home'].Url}>{Content['Home'].Page}</a>
              </li>
              <li className='govuk-breadcrumbs__list-item'>
                <a className='govuk-breadcrumbs__link' href='/applications'>Applications</a>
              </li>
              <li className='govuk-breadcrumbs__list-item'>
                <a className='govuk-breadcrumbs__link' href={`/applications/${selectedApplication.applicationId}/details`}>{selectedApplication.applicationName}</a>
              </li>
              <li className='govuk-breadcrumbs__list-item' aria-current='page'>{page}</li>
            </ol>
          </div>
          <section className='mainWrapper govuk-!-margin-top-7'>
            <aside className='sideBar'>
              <div className='sideBar_content' />
            </aside>

            <main className='mainContent' id='main-content' role='main'>
              <div className='govuk-main-wrapper govuk-!-padding-top-0'>
                <div className='govuk-grid-row'>
                  <div className='govuk-grid-column-full'>
                    <h1 className='govuk-heading-xl'>{page}</h1>

                    <dl className='govuk-summary-list'>
                      <div className='govuk-summary-list__row'>
                        <dt className='govuk-summary-list__key'>
                          Application:
                        </dt>
                        <dd className='govuk-summary-list__value'>
                          {(selectedApplication ? selectedApplication.applicationName : '')}
                        </dd>
                      </div>
                    </dl>

                    <table className='govuk-table govuk-!-margin-top-9'>
                      <caption className='govuk-table__caption govuk-heading-m'>Manage team members</caption>
                      <thead className='govuk-table__head'>
                        <tr className='govuk-table__row'>
                          <th scope='col' className='govuk-table__header'>Email</th>
                          <th scope='col' className='govuk-table__header'>Role</th>
                          <th scope='col' className='govuk-table__header'>Action</th>
                        </tr>
                      </thead>
                      <tbody className='govuk-table__body'>
                        <tr className='govuk-table__row'>
                          <th scope='row' className='govuk-table__header'>{(data && data.User) ? data.User.idToken['email'] : null}</th>
                          <td className='govuk-table__cell'>Admin</td>
                          <td className='govuk-table__cell' />
                        </tr>
                        <tr className='govuk-table__row'>
                          <th scope='row' className='govuk-table__header'>demo@education.gov.uk</th>
                          <td className='govuk-table__cell'>Developer</td>
                          <td className='govuk-table__cell'><a href='#' className='govuk-link'>Remove</a></td>
                        </tr>
                        {this.state.addingNewTeamMember && (
                          <tr className='govuk-table__row'>
                            <th scope='row' className='govuk-table__header'>
                              <input type='text' className='govuk-input' value={this.state.newTeamMember.email} onChange={(e) => this.changeNewTeamMember(e)} />
                            </th>
                            <td className='govuk-table__cell'>
                              <select className='govuk-select' id='role' name='role' onChange={(e) => this.selectRole(e)} value={this.state.newTeamMember.role}>
                                <option value=''>Select role</option>
                                <option value='admin'>Admin</option>
                                <option value='developer'>Developer</option>
                              </select>
                            </td>
                            <td className='govuk-table__cell'><a href='#' onClick={(e) => this.saveNewTeamMember(e)} className='govuk-link govuk-!-margin-right-2'>Save</a> <a href='#' className='govuk-link' onClick={(e) => this.cancelNewTeamMember(e)}>Cancel</a></td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    <button type='button' className='govuk-button' disabled={this.state.addingNewTeamMember} onClick={() => this.addNewTeamMember()}>Add a team member</button>
                  </div>
                </div>
              </div>
            </main>
          </section>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    selectedApplication: state.application.selectedApplication
  }
}

TeamMembers.displayName = 'Team Members'

export { TeamMembers }
export default connect(mapStateToProps, null)(TeamMembers)
