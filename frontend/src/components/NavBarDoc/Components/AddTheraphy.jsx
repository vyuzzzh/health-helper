import React from 'react';
import {
  Button,
} from 'reactstrap';
import AddTheraphy from '../AddComponents/AddTheraphy';

class Theraphy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theraphyCount: 1,
    };
  }

  addTheraphyClick() {
    this.setState({ theraphyCount: this.state.theraphyCount + 1 });
  }

  deleteTheraphyClick() {
    this.setState({ theraphyCount: this.state.theraphyCount - 1 });
  }

  render() {
    const addTheraphy = [];
    for (let i = 0; i < this.state.theraphyCount; i += 1) {
      addTheraphy.push(<AddTheraphy />);
    }

    const addTheraphyFin = addTheraphy.map((el) => (
      <>
        {el}
      </>
    ));

    return (
      <>
        {addTheraphyFin}
        <Button color="secondary" onClick={this.addTheraphyClick.bind(this)}>Add Theraphy</Button>
        <Button color="link" onClick={this.deleteTheraphyClick.bind(this)}>Delete Theraphy</Button>
      </>
    );
  }
}

export default Theraphy;
