// Script that updates API endpoint, checks status and applies visual indicator
'use script';
$(() => {
  let selectedAmenities = [];
  const selectors = {
    amenitiesHeader: '.amenities > h4',
    amenityCheckBox: '.amenities > .popover > ul > li > input[type="checkbox"]',
    amenityListItem: '.amenities > .popover > ul > li'
  };
  const API_URL = 'http://localhost:5001/api/v1';

  $(selectors.amenityListItem).on('mousedown', ev => {
    ev.target.getElementsByTagName('input')?.item(0)?.click();
  });

  $(selectors.amenityCheckBox).change(ev => {
    const amenityId = ev.target.getAttribute('data-id');
    const amenityName = ev.target.getAttribute('data-name');

    if (ev.target.checked) {
      if (!selectedAmenities.find(obj => obj.id === amenityId)) {
        selectedAmenities.push({
          id: amenityId,
          name: amenityName
        });
      }
    } else {
      selectedAmenities = selectedAmenities.filter(
        obj => (obj.id !== amenityId) && (obj.name !== amenityName)
      );
    }
    const htmlContent = selectedAmenities.map(obj => obj.name).join(', ');
    $(selectors.amenitiesHeader).html(
      selectedAmenities.length > 0 ? htmlContent : '&nbsp;'
    );
  });

  $.get(`${API_URL}/status`, (data, status) => {
    if ((status === 'success') && (data.status === 'OK')) {
      if (!$('div#api_status').hasClass('available')) {
        $('div#api_status').addClass('available');
      }
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
