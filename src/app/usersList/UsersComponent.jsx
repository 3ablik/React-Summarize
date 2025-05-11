const roles = ["user", "worker", "admin"];

const UsersComponent = ({ users, onRoleChange }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Управление пользователями</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.login}
            className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-[#f9f9f9]"
          >
            <div>
              <p className="text-lg font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <select
              className="border rounded px-3 py-1 bg-white"
              value={user.role}
              onChange={(e) => onRoleChange(user.login, e.target.value)}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersComponent;
