import { useEffect, useState } from 'react';

export default function Input() {
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [select, setSelect] = useState('');
  const [url, setUrl] = useState(
    'https://api.memegen.link/images/cryingfloor/Me trying to find/the missing }.png',
  );
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

  // Download functionality

  function forceDownload(blob, filename) {
    // Create an invisible anchor element
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.setAttribute('download', filename);
    document.body.appendChild(anchor);

    // Trigger the download by simulating click
    anchor.click();

    // Clean up
    window.URL.revokeObjectURL(anchor.href);
    document.body.removeChild(anchor);
  }

  function downloadResource(URL, filename) {
    // If no filename is set, use filename from URL
    if (!filename) filename = URL.match(/\/([^/#?]+)[^/]*$/)[1];

    fetch(URL, {
      headers: new Headers({
        Origin: window.location.origin,
      }),
      mode: 'cors',
    })
      .then((response) => response.blob())
      .then((blob) => forceDownload(blob, filename))
      .catch((e) => console.error(e));
  }

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
      <button
        onClick={() => {
          downloadResource(
            `https://api.memegen.link/images/${select}/${top}/${bottom}.png`,
          );
        }}
        type="button"
      >
        Download
      </button>
      <img alt="Generated Meme" src={url} />
    </form>
  );
}
