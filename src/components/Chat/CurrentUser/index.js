import React from "react";

import Typography from '@material-ui/core/Typography'
const CurrentUser = ({user}) => {

    console.log("[USER]", user)
  return (
    <div>
    <Typography variant="h5" component="h5">
          {user.name}
        </Typography>
        <Typography variant="h5" component="h5">
          @{user.id}
        </Typography>
    </div>
  );
};

export default CurrentUser;
