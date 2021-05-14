import { useEffect, useState } from 'react';

export default function Input() {
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [select, setSelect] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState([]);

  // Getting the values from the input boxes
  const handleTopChange = (event) => setTop(event.currentTarget.value);
  const handleBottomChange = (event) => setBottom(event.currentTarget.value);
  const handleSelectChange = (event) => setSelect(event.currentTarget.value);

  // Eventhandler for previewing the meme
  const handleMemeClick = () => {
    setUrl(`https://api.memegen.link/images/${select}/${top}/${bottom}.png`);
  };

  // Fetching Template Array used for the dropdown menu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.memegen.link/templates/');
        const json = await response.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <form>
      <label htmlFor="topline">Enter top line</label>
      <input
        type="text"
        id="topline"
        placeholder="You had"
        onChange={handleTopChange}
        value={top}
      />
      <label htmlFor="bottomline">Enter bottom line</label>
      <input
        type="text"
        id="bottomline"
        placeholder="one job"
        onChange={handleBottomChange}
        value={bottom}
      />
      <label htmlFor="meme">Choose your meme</label>
      {/* Mapping through array and creating the dropdown menu for choosing meme template */}
      <select value={select} id="meme" onChange={handleSelectChange}>
        {data.map((objects) => (
          <option value={objects.id} key={objects.id}>
            {objects.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleMemeClick}>
        Display meme
      </button>
      <button type="button">Download</button>
      <img alt="Generated Meme" src={url} />
    </form>
  );
}
