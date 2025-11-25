

const packages = [
    { id: 1, destination: "Goa", durationDays: 4, basePrice: 12000, season: "peak" },
    { id: 2, destination: "Maldives", durationDays: 5, basePrice: 35000, season: "off" },
    { id: 3, destination: "Andaman", durationDays: 6, basePrice: 28000, season: "mid" },
    { id: 4, destination: "Kerala Backwaters", durationDays: 3, basePrice: 15000, season: "mid" }
];



function calculateFinalPrice(pkg) {
    let price = pkg.basePrice;
    let multiplier = 1;

    switch (pkg.season) {
        case "peak":
            multiplier = 1.3;
            break;
        case "mid":
            multiplier = 1.15;
            break;
        case "off":
            multiplier = 0.9;
            break;
    }

    price *= multiplier;

    if (pkg.durationDays >= 5) {
        price += 1000; 
    }

    return Math.round(price);
}



if (document.getElementById("package-body")) {
    let tbody = document.getElementById("package-body");

    packages.forEach(pkg => {
        const finalPrice = calculateFinalPrice(pkg);

        tbody.innerHTML += `
            <tr>
                <td>${pkg.id}</td>
                <td>${pkg.destination}</td>
                <td>${pkg.durationDays} days</td>
                <td>₹${pkg.basePrice}</td>
                <td>${pkg.season}</td>
                <td>₹${finalPrice}</td>
            </tr>
        `;
    });
}




function populatePackageDropdown() {
    const dropdown = document.getElementById("packageSelect");
    if (!dropdown) return;

    packages.forEach(pkg => {
        dropdown.innerHTML += `<option value="${pkg.id}">${pkg.destination}</option>`;
    });
}

populatePackageDropdown();


function updateTotalPrice() {
    const pkgId = document.getElementById("packageSelect").value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    const guests = parseInt(document.getElementById("guests").value);
    const promo = document.getElementById("promo").value.trim().toUpperCase();

    if (!pkgId || !checkIn || !checkOut || !guests) {
        document.getElementById("totalPrice").innerText = "₹0";
        document.getElementById("submitBtn").disabled = true;
        return;
    }

    let pkg = packages.find(p => p.id == pkgId);
    let baseFinal = calculateFinalPrice(pkg);

    let nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

    if (nights <= 0) {
        document.getElementById("totalPrice").innerText = "Invalid dates";
        document.getElementById("submitBtn").disabled = true;
        return;
    }

    let total = baseFinal * nights;

    if (guests > 2) total *= 1.2;

    switch (promo) {
        case "EARLYBIRD":
            total *= 0.9;
            break;
        case "SUMMER25":
            total *= 0.75;
            break;
        case "WELCOME":
            total -= 1000;
            break;
    }

    if (total < 0) total = 0;

    document.getElementById("totalPrice").innerText = "₹" + Math.round(total);
    document.getElementById("submitBtn").disabled = false;
}

["packageSelect", "checkIn", "checkOut", "guests", "promo"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateTotalPrice);
});



const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");
const closeModal = document.getElementById("closeModal");

if (document.querySelectorAll(".thumb")) {
    document.querySelectorAll(".thumb").forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.dataset.large;
            modalCaption.innerText = img.alt;
        });
    });
}

if (closeModal) {
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });
}



const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});




const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (scrollTopBtn && window.scrollY > 200) {
        scrollTopBtn.style.display = "block";
    } else if (scrollTopBtn) {
        scrollTopBtn.style.display = "none";
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
