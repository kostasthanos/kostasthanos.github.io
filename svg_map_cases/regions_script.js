// Starting date of case reports and current date
var startDate = new Date('2020/02/26');
var todayDate = new Date;

// Calculae total number of days of the pandemic progression in Greece
var totalDays = Math.ceil(Math.abs(todayDate - startDate)*1.15740741*(10**(-8)));
document.getElementById('ndays').innerHTML = totalDays;

// Alphabet array of letters from A to P 
// |A to P| : 16 as many as the number of greek regions +2 for the
//            cases of no fixed abode and cases under investigation
alpha = 'ABCDEFGHIJKLMNOP'.split('')

// Get json file (data from iMEdD-Lab and modification in jupyter notebook to json file)
$.getJSON('https://raw.githubusercontent.com/kostasthanos/Covid-19-Regions-Greece/master/cases_per_region.json', function(data) {  
    // For each region-object add region id (region_id)
    for (var i=0; i<data.length; i++){
        data[i].region_id = 'GR-'+alpha[i];
    } 
    
    // Sort regions by number of cases from higher to lower (decreasing order)
    data.sort((x,y) => (x.number_of_cases - y.number_of_cases)).reverse();
    
    // Function to add on HTML, for each region, the name and number of cases
    $(function fillCases(){
        for (var i=0; i < data.length; i++){
            
            var firstId = 'region_name_GR-' + alpha[i];
            var secondId = 'region_cases_GR-' + alpha[i];
            
            if (data[i].region_name_gr=='Χωρίς Μόνιμη Κατοικία' || data[i].region_name_gr=='Υπό διερεύνηση'){
                document.getElementById(firstId).innerHTML = data[i].region_name_gr.fontcolor('#646464');
                document.getElementById(secondId).innerHTML = data[i].number_of_cases;
            }
            else{
                document.getElementById(firstId).innerHTML = data[i].region_name_gr;
                document.getElementById(secondId).innerHTML = data[i].number_of_cases;
            }
        }
    });    

    $(function() {
        // Fil with color each region depending on the number of cases 
        for(i = 0; i < data.length; i++) {
            // Opacity is set to (number of region cases)/0.5(maximun region cases) (add +200 for darker color)
            var color = 'rgba(240, 89, 21,' + (data[i].number_of_cases+200)/(0.5*data[0].number_of_cases) +')';
            $('#'+ data[i].region_id).css({'fill': color}).data('region', data[i]);
        }      
              
        $('#periferies > *').mouseover(function (e) {
           var perif_data=$(this).data('region');

            // Info box information in greek and english
            $('<div class="info_box">'+
                perif_data.region_name_gr + '<br>' + perif_data.region_name_en + '<br> Κρούσματα (cases): ' + perif_data.number_of_cases.toLocaleString("el") + '</div>'
             ).appendTo('body');
        });

        // Show info box when mousemove over a region
        $('#periferies > *').mousemove(function(e) {
            var mouseX = e.pageX, // mouse-x coordinates
                mouseY = e.pageY; // mouse-y coordinates

            // Position of information box
            $('.info_box').css({
                top: mouseY-50,
                left: mouseX+10
            });
        }).mouseleave(function () {
            $('.info_box').remove();
        });
        
    }); 
});

var mapPeri = document.querySelectorAll("#periferies > *");

// Function to add 'active' class (gray background color) on each periferia (region) map-path*/
mapPeri.forEach(function(p){
    var periId = p.getAttribute("id");
    
    p.addEventListener("mouseenter", function(){
        p.classList.add("active");
    });
    
    p.addEventListener("mouseleave", function(){
        p.classList.remove("active");
    });   
});

// Latest json file with general data of covid-19 in Greece
$.getJSON('https://raw.githubusercontent.com/kostasthanos/Covid-19-Regions-Greece/master/latest_data.json', function(latestData) {
    document.getElementById('ncases').innerHTML = latestData.Total_Cases;
    document.getElementById('dinc').innerHTML = latestData.Daily_Change;
    if (parseFloat(latestData.Daily_Increase) < 1.0){
        document.getElementById('dinc').style.color = '#2ab149';
    }
    else{
        document.getElementById('dinc').style.color = '#c41b1b';
    }
    document.getElementById('dcases').innerHTML = ' (' + latestData.Daily_Cases + ')';
    document.getElementById('dcases').style.color = '#c41b1b';
    document.getElementById('upday').innerHTML = latestData.Dates + '/' + todayDate.getFullYear().toString();
});

// Functions to open/close information boxes when buttons are pressed
function openGRWindow(){
    document.getElementById('informationGR').style.display = 'block';
    document.querySelector('.all').classList.add('blur-filter'); 
}

function closeGRWindow(){
   document.getElementById('informationGR').style.display = 'none';
   document.querySelector('.all').classList.remove('blur-filter'); 
}

function openENWindow(){
    document.getElementById('informationEN').style.display = 'block';
    document.querySelector('.all').classList.add('blur-filter'); 
}

function closeENWindow(){
    document.getElementById('informationEN').style.display = 'none';
    document.querySelector('.all').classList.remove('blur-filter'); 
}

function openLists(){
    document.getElementById('lists_gr_en').style.display = 'block';
    document.querySelector('.all').classList.add('blur-filter'); 
}

function closeLists(){
     document.getElementById('lists_gr_en').style.display = 'none';
    document.querySelector('.all').classList.remove('blur-filter'); 
}
