import { useEffect, useState } from 'react';

export default function Input() {
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [select, setSelect] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState([]);

  const handleTopChange = (event) => setTop(event.currentTarget.value);
  const handleBottomChange = (event) => setBottom(event.currentTarget.value);
  const handleSelectChange = (event) => setSelect(event.currentTarget.value);

  const handleMemeClick = () => {
    setUrl(`https://api.memegen.link/images/${select}/${top}/${bottom}.png`);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetch('https://api.memegen.link/templates')
      .then((response) => response.json())
      .then((receivedData) => setData(receivedData));
  };

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
      <select value={select} id="meme" onChange={handleSelectChange}>
        {data.map((objects, key) => (
          <option key={key}>{objects.name}</option>
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
