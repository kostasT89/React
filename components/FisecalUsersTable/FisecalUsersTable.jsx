import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cms from '../../config/messages';
import { formatDateInputForDisplay } from '../../utils/dateUtils';
import { createOptionsFromEnums } from '../../utils/formConfigUtils';
import clientStatuses from '../../constants/enums/clientStatuses';

import './FisecalUsersTable.scss';

const FisecalUsersTable = ({ onClick, onChange, fisecalUsers }) => (
  <table className="lc-fisecal-users-table-component">
    <thead className="lc-fisecal-users-table__header">
      <tr>
        <th>
          {cms['advisor_dashboard.user_table.name']}
        </th>
        <th>
          {cms['advisor_dashboard.user_table.co_client_name']}
        </th>
        <th>
          {cms['advisor_dashboard.user_table.email']}
        </th>
        <th>
          {cms['advisor_dashboard.user_table.state']}
        </th>
        <th>
          {cms['advisor_dashboard.user_table.last_login']}
        </th>
        <th>
          {cms['advisor_dashboard.user_table.co_browse']}
        </th>
        <th>
          {cms['advisor_dashboard.user_table.current_status']}
        </th>
      </tr>
    </thead>
    <tbody>
      {fisecalUsers.map((user, idx) =>
        <tr key={idx}>
          <td>
            {`${user.firstName} ${user.lastName || ''}`}
          </td>
          <td>
            {`${get(user, 'coClient.firstName', '')} ${get(user, 'coClient.lastName', '')}`}
          </td>
          <td>
            {user.email}
          </td>
          <td>
            {user.state}
          </td>
          <td>
            {(user.lastLogin && formatDateInputForDisplay(user.lastLogin)) ||
              cms['advisor_dashboard.user_table.never']}
          </td>
          <td>
            <button className="button"
                    onClick={() => onClick(user.id)}>
              {cms['advisor_dashboard.user_table.co_browse']}
            </button>
          </td>
          <td>
            <select onChange={e => onChange(user.id, e.target.value)}
                    defaultValue={user.currentStatus}>
              {createOptionsFromEnums(clientStatuses)
                .map(({ text, value }, innerIdx) =>
                  <option value={value}
                        key={innerIdx}>
                    {text}
                  </option>)}
            </select>
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

FisecalUsersTable.propTypes = {
onClick: PropTypes.func.isRequired,
onChange: PropTypes.func.isRequired,
fisecalUsers: PropTypes.array.isRequired
};

export default FisecalUsersTable;
