var contactModal = document.getElementById("contactModal");
var totalContacts = document.getElementById("totalContacts");
var totalFavContacts = document.getElementById("totalFavContacts");
var totalEmergencyContacts = document.getElementById("totalEmergencyContacts");
var totalContactsSpan = document.getElementById("totalContactsSpan");
var addContactBtn = document.getElementById("addContactBtn");
var searchInput = document.getElementById("searchInput");
var callBtn = document.getElementById("callBtn");
var emailBtn = document.getElementById("emailBtn");
var favBtn = document.getElementById("favBtn");
var emergencyBtn = document.getElementById("emergencyBtn");
var editBtn = document.getElementById("editBtn");
var deleteBtn = document.getElementById("deleteBtn");
var emptyStateFav = document.getElementById("emptyStateFav");
var emptyStateEmergency = document.getElementById("emptyStateEmergency");
var smallEmergncyItem = document.getElementById("smallEmergncyItem");
var bigEmergencyItem = document.getElementById("bigEmergencyItem");
var smallFavItem = document.getElementById("smallFavItem");
var bigFavItem = document.getElementById("bigFavItem");
var submitModalBtn = document.getElementById("submitModalBtn");
var closeModalBtn = document.getElementById("closeModalBtn");
var cancelModalBtn = document.getElementById("cancelModalBtn");
var currentSearch = "";
var contactForm = document.getElementById("contactForm");
var avatarPreview = document.getElementById("avatarPreview");
var avatarInput = document.getElementById("avatarInput");
var avatarPath = document.getElementById("avatarPath");
var contactPhone = document.getElementById("contactName");
var contactPhone = document.getElementById("contactPhone");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactNotes = document.getElementById("contactNotes");
var contactFavorite = document.getElementById("contactFavorite");
var contactEmergency = document.getElementById("contactEmergency");
var contactCardContainer = document.getElementById("contactCardContainer");
var nameError = document.getElementById("contactNameError");
var phoneError = document.getElementById("contactPhoneError");
var emailError = document.getElementById("contactEmailError");
var currentUpdateIndex = null;
var contactList;
var localS = localStorage.getItem("contacts");



avatarInput.addEventListener("change", function () {
  var file = avatarInput.files[0];
  console.log(file);

  if (!file) return;
  avatarPath.value = file.name;
  console.log(avatarPath);
  avatarPreview.innerHTML = `
                                <img src="img/${file.name}" alt="Avater preview" class="w-100 h-100 rounded-circle object-fit-cover">`;
});



if (localS) {
  contactList = JSON.parse(localS);
  displayContact();
} else {
  contactList = [];
}

function addContact() {


  var contact = {
    userName: contactName.value,
    userEmail: contactEmail.value,
    userPhone: contactPhone.value,
    userAddress: contactAddress.value,
    groupColors: getGroupColors(contactGroup.value),
    userGroup: contactGroup.value,
    userNotes: contactNotes.value,
    userFav: contactFavorite.checked,
    userEmergency: contactEmergency.checked,
    userImage: avatarPath.value ? "img/" + avatarPath.value : "",
  };
  console.log(contact);
  contactList.push(contact);
  console.log(contactList);
  displayContact();
  clearInputs();
  updateContactCount();
  localStorage.setItem("contacts", JSON.stringify(contactList));
}

addContactBtn.addEventListener("click", function () {
  contactModal.classList.add("d-flex");
  contactModal.classList.remove("d-none");
});


cancelModalBtn.addEventListener("click", function () {
  contactModal.classList.add("d-none");
  contactModal.classList.remove("d-flex");
  submitModalBtn.innerHTML = `<i class="fas fa-check me-2"></i>add Contact`;

  clearInputs();
});
closeModalBtn.addEventListener("click", function () {
  contactModal.classList.add("d-none");
  contactModal.classList.remove("d-flex");
  submitModalBtn.innerHTML = `<i class="fas fa-check me-2"></i>add Contact`;

  clearInputs();
});


function displayContact() {
  var cartona = "";
  var found = false;
  if (contactList.length <= 0) {
    cartona = `
            <div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>
      `;
  } else {
    for (var i = 0; i < contactList.length; i++) {
      var colors = getGroupColors(contactList[i].userGroup);
      if (!isMatch(contactList[i])) continue;
      found = true;
      cartona += `<div class="col-md-6 col-lg-12 col-xl-6 mb-4">
                            <div class="contact-card">
                                <div class="contact-card-header">
                                    <div class="d-flex align-items-start justify-content-start gap-3">
                                        <div class="position-relative flex-shrink-0  ">
                                            ${renderAvatar(contactList[i].userName, contactList[i].userImage)}
                                            ${contactList[i].userEmergency ? `
                                            <div class="badge-icon badge-heart d-flex justify-content-center align-items-center rounded-circle">
                                                <i class="fas fa-heart-pulse"></i>
                                            </div>`: ""}${contactList[i].userFav ? `
                                              <div
                                                class="badge-icon badge-star d-flex justify-content-center align-items-center rounded-circle">
                                                <i class="fas fa-star"></i>
                                            </div> `: ""}
                                        </div>
                                        <div class="flex-1 min-w-0 pt-1">
                                            <h3 class="contact-card-name truncate m-0 ">${contactList[i].userName}</h3>
                                            <div class="d-flex align-items-center gap-2 mt-1">
                                                <div class="contact-card-phone-container flex-shrink-0">
                                                    <i class="contact-card-phone-icon fas fa-phone"></i>
                                                </div>
                                                <span class="contact-card-phone truncate">${contactList[i].userPhone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="contact-details">
                                          ${contactList[i].userEmail ? `  <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center violet">
                                                <i class="contact-detail-icon violet fas fa-envelope"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${contactList[i].userEmail}</span>
                                        </div>`: ""} ${contactList[i].userAddress ?
          `
                                            <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center emerald">
                                                <i class="contact-detail-icon emerald fas fa-location-dot"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${contactList[i].userAddress}</span>
                                        </div> `: ""}
                                    </div>
                                    <div class="contact-tags">${contactList[i].userGroup ?
          `<span class="contact-tag d-inline-flex align-items-center" 
                                             style="background-color:${colors.bg}; color: ${colors.text}; border-color: ${colors.border};"
                                            >${contactList[i].userGroup}</span>` : ""}
                                       ${contactList[i].userEmergency
          ? `<span class="contact-emergency d-inline-flex align-items-center  ">
                                                 <i class="fas fa-heart-pulse "></i>
                                                 Emergency
                                               </span>`
          : ""
        }
                                        </div>
                                </div>


                                <div class="contact-card-actions">
                                    <div class="action-buttons-left">
                                        <a href="tel:${contactList[i].userPhone}" id="callBtn" class="action-button call" title="Call">
                                            <i class="fas fa-phone"></i>
                                        </a>

                                        <a href="mailto:${contactList[i].userEmail}" class="action-button email" id="emailBtn" title="Email">
                                            <i class="fas fa-envelope"></i>
                                        </a>
                                    </div>
                                    <div class="action-buttons-right">
                                        <button class="action-button favorite" id="favBtn" onclick="toggleFavorite(${i})" title="Favorite">
                                            <i class="${contactList[i].userFav ? "fas text-warning" : "far"} fa-star"></i>
                                        </button>
                                        <button class="action-button emergency" id="emergncyBtn" onclick="toggleEmergency(${i})" title="Emergency">
                                            <i class=" ${contactList[i].userEmergency ? "fas fa-heart-pulse text-danger" : "far fa-heart"}"></i>
                                        </button>
                                        <button class="action-button edit" id="editBtn"  onclick="prepareDateForUpdate(${i})" title="Edit">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button class="action-button delete" id="deleteBtn"  onclick="deleteContact(${i})" title="Delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
        
        `;
    }

    if (currentSearch && !found) {
      cartona = `
           <div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
                                     rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found in search</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>
      
      `;
    }
  }

  contactCardContainer.innerHTML = cartona;
  updateContactCount();
  updateFavSidebar();
  updateEmergencySidebar();
}

function clearInputs() {
  contactName.value = null;
  contactEmail.value = null;
  contactAddress.value = null;
  contactPhone.value = null;
  contactFavorite.checked = false;
  contactEmergency.checked = false;
  contactGroup.value = "";
  contactNotes.value = null;
  currentUpdateIndex = null;
  avatarPath.value = null;

  avatarPreview.innerHTML = renderAvatar();
  contactName.classList.remove("is-invalid", "is-valid");
  contactPhone.classList.remove("is-invalid", "is-valid");
  contactEmail.classList.remove("is-invalid", "is-valid");
}

submitModalBtn.addEventListener("click", function (e) {
  console.log(e);
  e.preventDefault();
  if (!validateInputs()) return;
  if (currentUpdateIndex === null) {
    addContact();
    updateEmergencySidebar();
    updateFavSidebar();
    contactModal.classList.add("d-none");
    contactModal.classList.remove("d-flex");
    Swal.fire({
      title: "Added!",
      text: "Contact has been added successfully !",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    sendUpdateData();
    updateFavSidebar();
    updateEmergencySidebar();
    contactModal.classList.add("d-none");
    contactModal.classList.remove("d-flex");
    Swal.fire({
      title: "Updated!",
      text: "Contact has been updated successfully !",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  }
});

if (currentUpdateIndex === null) {
  submitModalBtn.innerHTML = `<i class="fas fa-check me-2"></i>Add Contact`;
} else {
  submitModalBtn.innerHTML = `<i class="fas fa-check me-2"></i>Update Contact`;
}

function deleteContact(index) {
  console.log(index);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger fs-6 me-3",
      cancelButton: "btn btn-secondary fs-6",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Delete Contact?",
      text: `Are you sure you want to delete ${contactList[index].userName}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        contactList.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(contactList));
        displayContact();
        updateContactCount();
        updateFavSidebar();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
}

function prepareDateForUpdate(updateIndex) {
  console.log(updateIndex);
  currentUpdateIndex = updateIndex;

  submitModalBtn.innerHTML = `<i class="fas fa-check me-2"></i>Update Contact`;

  var contacts = contactList[updateIndex];
  console.log(contacts);
  contactModal.classList.add("d-flex");
  contactModal.classList.remove("d-none");

  contactName.value = contacts.userName;
  contactEmail.value = contacts.userEmail;
  contactAddress.value = contacts.userAddress;
  contactGroup.value = contacts.userGroup;
  contactNotes.value = contacts.userNotes;
  contactPhone.value = contacts.userPhone;
  contactFavorite.checked = contacts.userFav;
  contactEmergency.checked = contacts.userEmergency;
  avatarPath.value = contacts.userImage || "";

  if (contacts.userImage) {
    avatarPreview.innerHTML = `
        <img src="${contacts.userImage}" alt="Avater preview" class="w-100 h-100 rounded-circle object-fit-cover"> `;
  } else if (contacts.userName) {

    var initials = contacts.userName
      .trim()
      .split(" ")
      .map((w) => w[0].toUpperCase())
      .slice(0, 2)
      .join("");

    avatarPreview.innerHTML = initials;
  } else {
    avatarPreview.innerHTML = renderAvatar();
  }
}


function sendUpdateData() {
  if (currentUpdateIndex === null) return;

  contactList[currentUpdateIndex] = {
    userName: contactName.value,
    userEmail: contactEmail.value,
    userPhone: contactPhone.value,
    userAddress: contactAddress.value,
    userGroup: contactGroup.value,
    userNotes: contactNotes.value,
    userFav: contactFavorite.checked,
    userEmergency: contactEmergency.checked,
    userImage: avatarPath.value
      ? avatarPath.value.startsWith("img/")
        ? avatarPath.value
        : "img/" + avatarPath.value
      : "",
  };
  localStorage.setItem("contacts", JSON.stringify(contactList));
  submitModalBtn.innerHTML = `<i class="fas fa-check me-2"></i>Add Contact`;
  displayContact();
  clearInputs();
}


function updateContactCount() {
  totalContacts.innerHTML = contactList.length;
  totalContactsSpan.innerHTML = contactList.length;
}

function updateFavSidebar() {
  bigFavItem.innerHTML = "";
  var favCount = 0;
  var hasFav = false;
  for (var i = 0; i < contactList.length; i++) {
    var contact = contactList[i];
    if (contact.userFav) {
      hasFav = true;
      favCount++;
      var contactHTML = `<div class="col-12">
                                    <div id="smallFavItem"
                                        class="contact-item d-flex justify-content-between align-items-center gap-3 p-2 rounded-3 mb-3">
                                        <div class="flex-shrink-0">
                                            ${renderAvatar(contact.userName, contact.userImage)}
                                        </div>
                                        <div class="flex-grow-1 text-truncate">
                                            <h4 class="mb-0 fw-medium text-dark small text-truncate">${contact.userName}</h4>
                                            <p class="mb-0 text-muted small text-truncate">${contact.userPhone}</p>
                                        </div>
                                        <a href="tel:${contact.userPhone}"
                                            class="call-btn d-flex align-items-center justify-content-center flex-shrink-0">
                                            <i class="fas fa-phone"></i>
                                        </a>
                                    </div>
                                </div>`;
      bigFavItem.innerHTML += contactHTML;
    }
  }
  totalFavContacts.innerHTML = favCount;
  if (!hasFav) {
    bigFavItem.innerHTML = ` <div class="col-12">
                                    <div id="emptyStateFav" class="empty-state">
                                        <p class="text-muted mb-0">No favorites yet</p>
                                    </div>
                                </div> `;
  }
}

function updateEmergencySidebar() {
  bigEmergencyItem.innerHTML = "";
  var emergencyCount = 0;
  var hasEmergency = false;
  for (var i = 0; i < contactList.length; i++) {
    var contact = contactList[i];
    if (contact.userEmergency) {
      hasEmergency = true;
      emergencyCount++;
      var contactHTML = ` <div class="col-12">
                                    <div id="smallEmergncyItem"
                                        class="contact-item-emergency  d-flex align-items-center gap-3 p-2 rounded-3">
                                        <div class="flex-shrink-0">
                                         ${renderAvatar(contact.userName, contact.userImage)}
                                        </div>
                                        <div class="flex-grow-1 text-truncate">
                                            <h4 class="mb-0 fw-medium text-dark small text-truncate">${contact.userName}</h4>
                                            <p class="mb-0 text-muted small text-truncate">${contact.userPhone}</p>
                                        </div>
                                        <a href="tel:${contact.userPhone}"
                                            class="call-btn-emergency call-btn-rose d-flex align-items-center justify-content-center flex-shrink-0">
                                            <i class="fas fa-phone"></i>
                                        </a>
                                    </div>
                                </div>`;
      bigEmergencyItem.innerHTML += contactHTML;
    }
  }
  totalEmergencyContacts.innerHTML = emergencyCount;
  if (!hasEmergency) {
    bigEmergencyItem.innerHTML = `<div class="col-12">
                                    <div id="emptyStateEmergency" class="empty-state">
                                        <p class="text-muted mb-0">No emergency contacts</p>
                                    </div>
                                  </div> `;
  }
}

function toggleFavorite(index) {


  contactList[index].userFav = !contactList[index].userFav;
  localStorage.setItem("contacts", JSON.stringify(contactList));
  displayContact();
  updateFavSidebar();
}

function toggleEmergency(index) {
  contactList[index].userEmergency = !contactList[index].userEmergency;
  localStorage.setItem("contacts", JSON.stringify(contactList));
  displayContact();
  updateEmergencySidebar();
}

function getAvatarColors() {
  return [
    { from: "#3b82f6", to: "#2563eb" }, 
    { from: "#8b5cf6", to: "#6d28d9" }, 
    { from: "#10b981", to: "#0d9488" }, 
    { from: "#f43f5e", to: "#db2777" }, 
    { from: "#f59e0b", to: "#ea580c" }, 
    { from: "#06b6d4", to: "#2563eb" }, 
    { from: "#6366f1", to: "#8b5cf6" }, 
    { from: "#d946ef", to: "#ec4899" }, 
  ];
}

function getColorByName(name) {
  var colors = getAvatarColors();
  var indexColorName = name.length % colors.length;
  return colors[indexColorName];
}

function renderAvatar(name = "", imagePath = "") {
  if (imagePath && imagePath !== "img/" && imagePath !== "") {
    return `
            <img src="${imagePath}" alt="sssss"
                                                class="contact-card-avatar object-fit-cover">
        `;
  }

  if (name && name.trim() !== "") {

    var initials = name
      .trim()
      .split(" ")
      .map((w) => w[0].toUpperCase())
      .slice(0, 2)
      .join("");
    var color = getColorByName(name);

    return `
          <div class="contact-card-avatar d-flex align-items-center justify-content-center text-white fw-bold"
            style="background: linear-gradient(135deg, ${color.from} ,${color.to});"
            >
            ${initials}
            </div>
        
        `;
  }

  return `
       <div class="contact-card-avatar d-flex align-items-center justify-content-center text-white fw-bold"
         
            >
                               <i class="fas fa-users text-white"></i>

            </div>
    
    `;
}

function getGroupColors(group) {
  var color = {
    family: { bg: "#cfe8ff", text: "#1e40af", border: "#93c5fd" },
    friends: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
    work: { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" },
    school: { bg: "#fef3c7", text: "#b45309", border: "#fde68a" },
    other: { bg: "#f3f4f6", text: "#374151", border: "#d1d5db" },
  };

  return color[group] || color["other"];
}

searchInput.addEventListener("input", function () {
  console.log(searchInput.value.trim().toLowerCase());
  currentSearch = searchInput.value.trim().toLowerCase();
  displayContact();
});


function isMatch(contact) {
  if (!currentSearch) return true;

  return (
    contact.userName.toLowerCase().includes(currentSearch) ||
    (contact.userEmail &&
      contact.userEmail.toLowerCase().includes(currentSearch)) ||
    (contact.userPhone &&
      contact.userPhone.toLowerCase().includes(currentSearch))
  );
}


var rules = {
  name: {
    regex: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/,
    errorId: "contactNameError",
    message: "Name should contain only letters (2–50 characters)",
  },
  phone: {
    regex: /^(01|(\+20|0020|20)1)[0125][0-9]{8}$/,
    errorId: "contactPhoneError",
    message: "Please enter a valid Egyptian phone number",
  },
  email: {
    regex: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    errorId: "contactEmailError",
    message: "Please enter a valid email address",
    optional: true,
  },
};

function showInvalid(input, errId) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  document.getElementById(errId).classList.remove("d-none");
}
function showValid(input, errId) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  document.getElementById(errId).classList.add("d-none");
}

function validateField(input, rule) {
  var value = input.value.trim();
  var errElemnt = document.getElementById(rule.errorId);
  console.log(value);
  console.log(errElemnt);
  if (!value && rule.optional) {
    contactEmail.classList.remove("is-invalid", "is-valid");
    errElemnt.classList.add("d-none");
    return true
  }
  if (!value || !rule.regex.test(value)) {
    showInvalid(input, rule.errorId);
    return false;
  }

  showValid(input, rule.errorId);
  return true
}

contactName.addEventListener("input", function () {
  validateField(contactName, rules.name);
});

contactPhone.addEventListener("input", function () {
  validateField(contactPhone, rules.phone);
});
contactEmail.addEventListener("input", function () {
  validateField(contactEmail, rules.email);
});

function validateInputs() {
  var isNameValid = validateField(contactName, rules.name);
  var isPhoneValid = validateField(contactPhone, rules.phone);
  var isEmailValid = validateField(contactEmail, rules.email);

  if (!isNameValid) {

    Swal.fire({
      title: "Invalid name!",
      text: rules.name.message,
      icon: "error",
      customClass: {
        container: "swal-container",
      },
    });
    return false;
  }

  if (!isPhoneValid) {

    Swal.fire({
      title: "invalid phone number!",
      text: rules.phone.message,
      icon: "error",
      customClass: {
        container: "swal-container",
      },
    });
    return false;
  }

  if (!isEmailValid) {

    Swal.fire({
      title: "Invalid email!",
      text: rules.email.message,
      icon: "error",
      customClass: {
        container: "swal-container",
      },
    });
    return false;
  }

  if (isDuplicate(contactPhone.value, currentUpdateIndex)) {
    showInvalid(contactPhone, "contactPhoneError");
    Swal.fire({
      title: "Duplicate Phone",
      text: "the phone number is already exsit",
      icon: "error",
      customClass: {
        container: "swal-container",
      },
    });
    return false;
  }


  return true
}

function normalizeEgyptionPhone(phone) {
  if (!phone || typeof phone !== "string") {
    return "";
  }

  phone = phone.replace(/\D/g, "");

  if (phone.startsWith('20')) {
    phone = "0" + phone.slice(2);
  }

  if (phone.startsWith("0020")) {
    phone = "0" + phone.slice(4);
  }
  return phone
}

function isDuplicate(phone, ignoreIndex) {
  var normalizedInput = normalizeEgyptionPhone(phone);
  console.log(normalizedInput + "the input u write");

  for (var i = 0; i < contactList.length; i++) {
    if (i == ignoreIndex) continue;


    var normalizedStored = normalizeEgyptionPhone(contactList[i].userPhone);
    if (normalizedInput === normalizedStored) {
      return true;
    }

  }
  return false
}