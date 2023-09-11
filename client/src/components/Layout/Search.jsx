import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Search = () => {
  return (
    <div>
      <InputGroup className='m-md-0'>
        <InputGroup.Text>Pesquisar produto</InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          className='w-25'
          style={{marginRight: '50px'}}
        />
      </InputGroup>
    </div>
  )
}

export default Search
