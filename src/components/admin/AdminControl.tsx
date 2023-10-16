import { useEffect, useState } from "react";
import { ref, onValue, push, set, update } from "firebase/database";
import { db, auth } from "../../firebase";
import AdminLogin from "./AdminLogin";
import ArtQueueForm from "./AddArtForm";
import AdminHeader from "./AdminHeader";
import AdminLogout from "./AdminLogout";
import ArtDetails from "./ArtDetails";
import AllArtList from "./AllArtList";
import EditArtForm from "./EditArtForm";
import SellArtForm from "./SellArtForm";

export interface ArtObj {
  title: string;
  description: string;
  price: string;
  quantity: string;
  available: string;
  imageUrl: string;
  forSale?: boolean;
  closeDate?: Date;
  id: string;
}

function AdminControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [artList, setArtList] = useState<ArtObj[]>([]);
  const [selectedArt, setSelectedArt] = useState<ArtObj | null>(null);
  const [countDownDate, setCountDownDate] = useState<number | null>(null);
  const [forSale, setForSale] = useState<ArtObj | null>(null);
  const [loginView, setLoginView] = useState(false);
  const [logoutView, setLogoutView] = useState(false);
  const [editing, setEditing] = useState(false);
  const [sellForm, setSellForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const artdb = ref(db, "art/");
    const unSubscribe = onValue(
      artdb,
      (snapshot: import("firebase/database").DataSnapshot) => {
        const artworks: ArtObj[] = [];
        const data = snapshot.val() as Record<string, ArtObj>;
        const keys = Object.keys(data);
        keys.forEach((art, index) => {
          const artwork = {
            ...data[art],
            id: keys[index],
          };
          artworks.push(artwork);
        });
        setArtList(artworks);
        const artOnSale = artworks.filter((art) => art.forSale === true);
        setForSale(artOnSale[0]);
        const dateData = artOnSale[0].closeDate;
        if (dateData) {
          const jsDate = new Date(dateData);
          setCountDownDate(jsDate.getTime());
        }
      },
      (error) => {
        setSuccessMessage(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  const handleAddArtSubmit = (artwork: ArtObj) => {
    const newDataRef = push(ref(db, "art"));
    set(newDataRef, artwork)
      .then(() => {
        setSuccessMessage("Added!");
        clearMessage();
        handleViewAllArtClick();
      })
      .catch((error: { message: string }) => {
        setSuccessMessage(error.message);
        clearMessage();
      });
  };

  const handleSelectArtClick = (id: string) => {
    const selection = artList.filter((artwork) => artwork.id === id)[0];
    setSelectedArt(selection);
    setEditing(false);
  };

  const handleDeleteArtClick = (id: string) => {
    const dataRef = ref(db, `art/${id}`);
    set(dataRef, null)
      .then(() => {
        setSuccessMessage("Deleted!");
        clearMessage();
      })
      .catch((error: { message: string }) => {
        setSuccessMessage(error.message);
        clearMessage();
      });
    setTimeout(() => {
      handleViewQueueClick();
    }, 1000);
  };

  const handleEditArtSubmit = (artwork: ArtObj) => {
    const dataRef = ref(db, `art/${artwork.id}`);
    update(dataRef, artwork)
      .then(() => {
        setSuccessMessage("Updated!");
        clearMessage();
      })
      .catch((error: { message: string }) => {
        setSuccessMessage(error.message);
        clearMessage();
      });
    setEditing(false);
    setSelectedArt(null);
  };

  const handleSubmitArtSale = (artwork: ArtObj, date: Date) => {
    if (forSale !== null) {
      const replacement = artList.filter((art) => art === forSale)[0];
      replacement.forSale = false;
      handleEditArtSubmit(replacement);
    }
    const newDataRef = ref(db, `art/${artwork.id}`);
    const sellArt = {
      ...artwork,
      closeDate: date,
      forSale: true,
    };
    update(newDataRef, sellArt)
      .then(() => {
        setSuccessMessage("Added To Sale!");
        clearMessage();
      })
      .catch((error: { message: string }) => {
        setSuccessMessage(error.message);
        clearMessage();
      });
    setSellForm(false);
    setSelectedArt(null);
  };

  const clearMessage = () => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  const handleLoginViewClick = () => {
    setLoginView(true);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setEditing(false);
    setSellForm(false);
  };

  const handleLogoutViewClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(true);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setEditing(false);
    setSellForm(false);
  };

  const handleViewQueueClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setEditing(false);
    setSellForm(false);
  };

  const handleAddArtClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(true);
    setSelectedArt(null);
    setEditing(false);
    setSellForm(false);
  };

  const handleViewAllArtClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setEditing(false);
    setSellForm(false);
  };

  const handleViewEditingClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setEditing(true);
    setSellForm(false);
  };

  const handleSellArtViewClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setEditing(false);
    setSellForm(true);
  };

  if (auth.currentUser == null) {
    let currentView = null;
    if (loginView) {
      currentView = <AdminLogin />;
    } else {
      currentView = <p>Please login to your admin account</p>;
    }
    return (
      <div className="admin-body">
        <AdminHeader
          loginClick={handleLoginViewClick}
          logoutViewClick={handleLogoutViewClick}
        />
        {currentView}
      </div>
    );
  } else if (auth.currentUser != null) {
    let currentView = null;
    if (logoutView) {
      currentView = <AdminLogout />;
    } else if (editing) {
      
      currentView = (
        <EditArtForm
          artwork={selectedArt}
          updateArt={handleEditArtSubmit}
          backToArt={handleSelectArtClick}
        />
      );
    } else if (formVisibleOnPage) {
      currentView = (
        <ArtQueueForm
          addSomeArt={handleAddArtSubmit}
          back={handleViewAllArtClick}
        />
      );
    } else if (sellForm) {
      currentView = (
        <SellArtForm
          selection={selectedArt}
          sellArt={handleSubmitArtSale}
          back={handleViewAllArtClick}
        />
      );
    } else if (selectedArt != null) {
      currentView = (
        <ArtDetails
          selection={selectedArt}
          deleteArt={handleDeleteArtClick}
          editArt={handleViewEditingClick}
          sellArt={handleSellArtViewClick}
          back={handleViewAllArtClick}
        />
      );
    } else {
      currentView = (
        <AllArtList
          allArt={artList}
          forSale={forSale}
          countdown={countDownDate}
          onArtClick={handleSelectArtClick}
          onAddArtClick={handleAddArtClick}
        />
      );
    }
    return (
      <div className="admin-body">
        <AdminHeader
          loginClick={handleLoginViewClick}
          logoutViewClick={handleLogoutViewClick}
        />
        <p className="success-msg">{successMessage}</p>
        {currentView}
      </div>
    );
  }
}

export default AdminControl;
