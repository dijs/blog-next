export default function Search({ value, onChange }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        onFocus={(e) => {
          e.target.placeholder = '';
        }}
        onBlur={(e) => {
          e.target.placeholder = 'Search...';
        }}
        onChange={(ev) => onChange(ev.target.value)}
        value={value}
      />
    </div>
  );
}
