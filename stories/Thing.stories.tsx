import React from 'react';
import { useThaiAddress } from '../src';

export default {
  title: 'useThaiAddress',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = () => {
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
