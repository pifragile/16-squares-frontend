function QuerySelector({ handleChange }) {
    return (
        <select id="querySelector" name="queries" onChange={handleChange}>
            <option value="listed">Listed</option>
            <option value="all">All</option>
        </select>
    );
}

export default QuerySelector;
