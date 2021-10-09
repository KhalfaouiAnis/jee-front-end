import { useDispatch, useSelector } from "react-redux";
import { deleteMenuItem } from "../../../redux/actions/menuActions";
import MenuItem from "../components/MenuItem";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { deleteMenu } from "../../../redux/action-types/menuActionTypes";

export default function MenuScreen() {
  const dispatch = useDispatch();
  const restaurantState = useSelector(
    (state) => state.getRestaurantByManagerId
  );
  const {
    restaurant: { menu },
  } = restaurantState;

  const deleteMenuState = useSelector((state) => state.deleteMenuItem);
  const { success, error } = deleteMenuState;

  function handleDelete(menu) {
    Swal.fire({
      title: "Delete this menu item ?",
      confirmButtonText: "Continue",
      cancelButtonText: "Cancel",
      focusCancel: true,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      showCloseButton: true,
    })
      .then((result) => {
        if (result.value) {
          dispatch(deleteMenuItem(menu));
        }
      })
      .catch((err) => {
        Swal.fire("error", err, "error");
      });
  }

  useEffect(() => {
    if (success) {
      Swal.fire("", success, "success").then((_) => {
        dispatch({
          type: deleteMenu.DELETE_RESET,
        });
      });
    }
  }, [dispatch, success, error]);

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex col-md-12 flex-wrap">
          {menu &&
            menu.map((menuItem) => {
              return (
                <MenuItem
                  key={menuItem.id}
                  menuItem={menuItem}
                  handleDelete={handleDelete}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
