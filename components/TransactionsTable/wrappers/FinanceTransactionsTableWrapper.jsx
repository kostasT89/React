import Dimensions from 'react-dimensions';
// Local Deps
import { dimensionsFunctions } from '../../../schemas/tables/transactionsTableSchema2';
import TransactionsTable from '../TransactionsTable';

// See react-dimensions for the best way to configure
// https://github.com/digidem/react-dimensions
export default Dimensions({
  getHeight: dimensionsFunctions.getHeight,
  getWidth: dimensionsFunctions.getWidth
})(TransactionsTable);
