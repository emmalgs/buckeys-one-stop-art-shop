import { useEffect, useState } from 'react';
import { ref, onValue, push, set, update } from "firebase/database";
import { db, auth } from "../../firebase";
import AdminLogin from './AdminLogin';
import ArtQueueForm from './AddArtForm';
import AdminHeader from './AdminHeader';
import AdminLogout from './AdminLogout';
import ArtDetails from './ArtDetails';
import AllArtList from './AllArtList';
import EditArtForm from './EditArtForm';
import SellArtForm from './SellArtForm';

export interface ArtObj {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  id: string;
}

export interface SaleObj {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  id: string;
  closeDate: Date;
}

function AdminControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [artList, setArtList] = useState<ArtObj[]>([]);
  const [selectedArt, setSelectedArt] = useState<ArtObj | null>(null);
  const [forSale, setForSale] = useState<SaleObj | null>(null);
  const [loginView, setLoginView] = useState(false);
  const [logoutView, setLogoutView] = useState(false);
  const [editing, setEditing] = useState(false);
  const [sellForm, setSellForm] = useState(false);

  useEffect(() => {
    const artdb = ref(db, 'art/');
    const unSubscribe = onValue(
      artdb, (snapshot: import("firebase/database").DataSnapshot) => {
      const artworks: ArtObj[] = [];
      const data = snapshot.val() as Record<string, ArtObj>;
      const keys = Object.keys(data)
      keys.forEach((art, index) => {
        const artwork = {
          ...data[art],
          id: keys[index]
        }
        artworks.push(artwork);
      });
      setArtList(artworks)
      console.log(artworks)
    },
    (error) => {
      console.log(error);
    });
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    const artdb = ref(db, 'sell/');
    const unSubscribe = onValue(
      artdb, (snapshot: import("firebase/database").DataSnapshot) => {
      const data = snapshot.val() as Record<string, SaleObj>;
      const index = Object.keys(data);
      const saleItem = data[index[0]]
      setForSale(saleItem)
    },
    (error) => {
      console.log(error);
    });
    return () => unSubscribe();
  }, []);

  const handleAddArtSubmit = (artwork: ArtObj) => {
    const newDataRef = push(ref(db, 'art'));
    set(newDataRef, artwork)
    .then(() => {
      console.log('added it!');
    })
    .catch((error: { message: string} ) => {
      console.log(`error! ${error.message}`)
    })
  }

  const handleSelectArtClick = (id: string) => {
    const selection = artList.filter((artwork) => artwork.id === id)[0]
    setSelectedArt(selection);
  }

  const handleDeleteArtClick = (id: string) => {
    const dataRef = ref(db, `art/${id}`);
    set(dataRef, null)
      .then(() => {
        console.log('deleted!');
      })
      .catch((error: { message: string}) => {
        console.log(`error! ${error.message}`)
      });
    setTimeout(() => {
      handleViewQueueClick()
    }, 1000);
  }

  const handleEditArtSubmit = (artwork: ArtObj) => {
    const dataRef = ref(db, `art/${artwork.id}`);
    update(dataRef, artwork)
      .then(() => {
        console.log('updated!');
      })
      .catch((error: { message: string}) => {
        console.log(`error! ${error.message}`)
      });
    setEditing(false);
    setSelectedArt(null);
  }

  const handleSubmitArtSale = (artwork: ArtObj, date: Date) => {
    const newDataRef = push(ref(db, 'sell'));
    const sellArt = { 
      ...artwork,
      closeDate: date
    }
    set(newDataRef, sellArt)
      .then(() => {
        console.log('added to sale!')
      })
      .catch((error: { message: string}) => {
        console.log(`error! ${error.message}`)
      });
    setSellForm(false);
    setSelectedArt(null);
  }

  const handleLoginViewClick = () => {
    setLoginView(true);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setEditing(false);
    setSellForm(false)
  }

  const handleLogoutViewClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(true);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setEditing(false);
    setSellForm(false)
  }

  const handleViewQueueClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setEditing(false);
    setSellForm(false)
  }

  const handleAddArtClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(true);
    setSelectedArt(null);
    setEditing(false);
    setSellForm(false)
  }

  const handleViewAllArtClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setEditing(false);
    setSellForm(false)
  }

  const handleViewEditingClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setEditing(true);
    setSellForm(false)
  }

  const handleSellArtViewClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setEditing(false);
    setSellForm(true);
  }


  if (auth.currentUser == null) {
    let currentView = null;
    if (loginView) {
      currentView = <AdminLogin />
    } else {
      currentView = <p>Please login to your admin account</p>
    }
    return (
      <div className='admin-body'>
        <AdminHeader 
          loginClick={handleLoginViewClick} 
          logoutViewClick={handleLogoutViewClick} 
          viewAllArtClick={handleViewAllArtClick} />
        {currentView}
      </div>
    )
  } else if (auth.currentUser != null) {
    let currentView = null;
    if (logoutView) {
      currentView = <AdminLogout />
    } else if (editing) {
      currentView = 
        <EditArtForm
          artwork={selectedArt}
          updateArt={handleEditArtSubmit} /> 
    } else if (formVisibleOnPage) {
      currentView = 
        <ArtQueueForm 
          addSomeArt={handleAddArtSubmit}
           />
    } else if (sellForm) {
      currentView = 
        <SellArtForm 
          selection={selectedArt} 
          sellArt={handleSubmitArtSale} />
    } else if (selectedArt != null) {
      currentView = 
        <ArtDetails 
          selection={selectedArt} 
          deleteArt={handleDeleteArtClick}
          editArt={handleViewEditingClick} 
          sellArt={handleSellArtViewClick} />
    } else {
        currentView = 
          <AllArtList 
            allArt={artList} 
            // forSale={forSale}
            onArtClick={handleSelectArtClick} 
            onAddArtClick={handleAddArtClick} />
      }
    return (
      <div className='admin-body'>
        <AdminHeader 
          loginClick={handleLoginViewClick}
          logoutViewClick={handleLogoutViewClick}
          viewAllArtClick={handleViewAllArtClick} />
        {currentView}
      </div>
    )
  }
}

export default AdminControl;
