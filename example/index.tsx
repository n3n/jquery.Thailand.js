import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useThaiAddress } from '../.';

const App = () => {
  const [addresses, setAddresses] = React.useState([])
  const { searchAddressByZipcode } = useThaiAddress();

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const result = searchAddressByZipcode(value);
    setAddresses(result);
  }, [setAddresses]);

  return (
    <div>
      <h6>Zipcode</h6>
      <input type="text" name="zipcode" onChange={handleChange} />
      <pre>{JSON.stringify(addresses, null, 2)}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
