import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const TestComponent = () => {
  const [value, setValue] = useState(null);
  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyB9O38Vmhu9lQ51nzcojDxifDQnO67lYXU"
        selectProps={{
          value,
          onChange: setValue,
        }}
        onLoadFailed={(error) => (
          console.error("Could not inject Google script", error)
        )}
      />
    </div>
  )
};

export default TestComponent;