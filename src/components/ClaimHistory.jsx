function ClaimHistory({ history }) {
  return (
    <div className="claim-history">
      <h2>Claim History</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Points</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.userId.name}</td>
              <td>{entry.points}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClaimHistory;